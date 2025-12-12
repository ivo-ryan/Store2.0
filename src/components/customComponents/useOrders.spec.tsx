import { renderHook, waitFor, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import useOrders from "./useOrders";
import { userService } from "@/services/userService";

vi.stubGlobal("sessionStorage", {
  getItem: vi.fn(() => "mocked-user"),
});

vi.mock("@/services/userService", () => ({
  userService: {
    getAllOrders: vi.fn(),
    updateOrder: vi.fn(),
  },
}));

describe("useOrders hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("carrega pedidos ao montar", async () => {
    (userService.getAllOrders as any).mockResolvedValue({
      data: [
        { id: 1, status: "PENDING" },
        { id: 2, status: "PAID" },
      ],
    });

    const { result } = renderHook(() => useOrders());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.orders.length).toBe(2);
    });

    expect(result.current.loading).toBe(false);
    expect(userService.getAllOrders).toHaveBeenCalled();
  });

  it("updateOrderStatus chama updateOrder e refaz o fetch", async () => {
    (userService.getAllOrders as any).mockResolvedValueOnce({
      data: [{ id: 1, status: "PENDING" }],
    });

    (userService.getAllOrders as any).mockResolvedValueOnce({
      data: [{ id: 1, status: "PAID" }],
    });

    (userService.updateOrder as any).mockResolvedValue({});

    const { result } = renderHook(() => useOrders());

    await waitFor(() => {
      expect(result.current.orders.length).toBe(1);
    });

    await act(async () => {
      await result.current.updateOrderStatus(1, "PAID");
    });

    expect(userService.updateOrder).toHaveBeenCalledWith(1, "PAID");

    await waitFor(() => {
      expect(result.current.orders[0].status).toBe("PAID");
    });
  });

  it("não chama API se não houver usuário no sessionStorage", async () => {

    (sessionStorage.getItem as any).mockReturnValueOnce(null);

    const { result } = renderHook(() => useOrders());

    await waitFor(() => {
      expect(result.current.orders).toEqual([]);
    });

    expect(userService.getAllOrders).not.toHaveBeenCalled();
  });
});
