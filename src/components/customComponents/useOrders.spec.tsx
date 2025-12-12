import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

// ==============================================================
// 1. Tipos das funções reais do service
// ==============================================================

import type { OrdersProps, PaymentProps } from "@/services/userService";

// Função real: retorna Promise<{ data: OrdersProps[] }>
type GetAllOrdersFn = () => Promise<{ data: OrdersProps[] }>;

// Função real: retorna Promise<PaymentProps>
type UpdateOrderFn = (id: number, status: "PAID" | "FAILED") => Promise<PaymentProps>;

// Tipos mockados
type MockedGetAllOrders = vi.MockedFunction<GetAllOrdersFn>;
type MockedUpdateOrder = vi.MockedFunction<UpdateOrderFn>;

// ==============================================================
// 2. Mock do userService
// ==============================================================

vi.mock("@/services/userService", () => ({
  userService: {
    getAllOrders: vi.fn() as MockedGetAllOrders,
    updateOrder: vi.fn() as MockedUpdateOrder,
  },
}));

import useOrders from "./useOrders";
import { userService } from "@/services/userService";

// ==============================================================
// 3. Mock da sessionStorage
// ==============================================================

const mockSessionStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, "sessionStorage", {
  value: mockSessionStorage,
  writable: true,
});

const getItemSpy = vi.spyOn(mockSessionStorage, "getItem");

// ==============================================================
// 4. Testes
// ==============================================================

describe("useOrders", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    getItemSpy.mockReturnValue("user_test");
  });

  // ---------- TESTE 1 ----------
  it("carrega pedidos quando storedUser existe", async () => {
    const mockedOrders: OrdersProps[] = [
      {
        id: 1,
        createdAt: "",
        customer: "",
        items: [],
        payment: { provider: "", status: "PAID" },
        status: "PAID",
        total: 50,
      },
    ];

    (userService.getAllOrders as MockedGetAllOrders).mockResolvedValue({
      data: mockedOrders,
    });

    const { result } = renderHook(() => useOrders());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.orders).toEqual(mockedOrders);
  });

  // ---------- TESTE 2 ----------
  it("mantém loading correto quando ocorre erro", async () => {
    (userService.getAllOrders as MockedGetAllOrders).mockRejectedValue(
      new Error("erro")
    );

    const { result } = renderHook(() => useOrders());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.orders).toEqual([]);
  });

  // ---------- TESTE 3 ----------
  it("atualiza status do pedido e refaz fetch", async () => {
    const initialOrders: OrdersProps[] = [
      {
        id: 1,
        createdAt: "",
        customer: "",
        items: [],
        payment: { provider: "", status: "PAID" },
        status: "PAID",
        total: 100,
      },
    ];

    const updatedOrders: OrdersProps[] = [
      {
        id: 1,
        createdAt: "",
        customer: "",
        items: [],
        payment: { provider: "", status: "FAILED" },
        status: "CANCELED",
        total: 100,
      },
    ];

    // Primeiro fetch
    (userService.getAllOrders as MockedGetAllOrders)
      .mockResolvedValueOnce({ data: initialOrders })
      // Segundo fetch após updateOrderStatus
      .mockResolvedValueOnce({ data: updatedOrders });

    // updateOrder precisa retornar um PaymentProps (mock simplificado)
    (userService.updateOrder as MockedUpdateOrder).mockResolvedValue({
      id: 1,
      provider: "",
      status: "FAILED",
      amount: 100,
      createdAt: new Date(),
      updatedAt: new Date(),
      playgroundUrl: null,
      orderId: 1,
    });

    const { result } = renderHook(() => useOrders());

    // Aguardar primeiro fetch
    await waitFor(() => {
      expect(result.current.orders).toEqual(initialOrders);
    });

    // Disparar updateOrderStatus
    await result.current.updateOrderStatus(1, "FAILED");

    // Aguardar segundo fetch
    await waitFor(() => {
      expect(userService.updateOrder).toHaveBeenCalledWith(1, "FAILED");
      expect(result.current.orders).toEqual(updatedOrders);
    });
  });
});
