import { renderHook, act } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import useCart from "./useCart";


const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush })
}));


const mockUseAuth = {
  productsCart: [{}],
  setCartChange: vi.fn(),
  setProductsCart: vi.fn()
};

vi.mock("./useAuth", () => ({
  useAuth: () => mockUseAuth
}));

vi.mock("./useProduct", () => ({
  default: () => ({
    products: [
      {
        id: 1,
        name: "Produto Teste",
        price: 10,
        images: [{ url: "img.png" }],
      }
    ]
  })
}));


const mockCreateOrder = vi.fn();

vi.mock("@/services/userService", () => ({
  userService: {
    createOrder: (...args:any) => mockCreateOrder(...args)
  }
}));


beforeEach(() => {
  mockPush.mockReset();
  mockCreateOrder.mockReset();
  mockUseAuth.productsCart = [];
  mockUseAuth.setCartChange.mockReset();
  mockUseAuth.setProductsCart.mockReset();

  vi.stubGlobal("sessionStorage", {
    getItem: vi.fn(() => JSON.stringify({ id: 123 })),
    setItem: vi.fn(),
    removeItem: vi.fn(),
  });
});


describe("useCart Hook", () => {

  it("deve retornar valores iniciais", () => {
    const { result } = renderHook(() => useCart());
    expect(result.current.loading).toBe(false);
    expect(result.current.createSigleOrder).toBeDefined();
    expect(result.current.hanldeClickCreateOrder).toBeDefined();
  });

  it("createSigleOrder deve criar uma order e redirecionar", async () => {
    const { result } = renderHook(() => useCart());

    await act(async () => {
      await result.current.createSigleOrder(1);
    });

    expect(mockCreateOrder).toHaveBeenCalledTimes(1);

    expect(mockCreateOrder).toHaveBeenCalledWith([
      {
        quantity: 1,
        productId: 1,
        name: "Produto Teste",
        price: 10,
        image: "img.png",
      }
    ]);

    expect(mockPush).toHaveBeenCalledWith("/orders");
  });

  it("createSigleOrder não deve criar pedido sem storedUser", async () => {
    (sessionStorage.getItem as any).mockReturnValueOnce(null);

    const { result } = renderHook(() => useCart());

    await act(async () => {
      await result.current.createSigleOrder(1);
    });

    expect(mockCreateOrder).not.toHaveBeenCalled();
  });

  it("hanldeClickCreateOrder deve criar pedido baseado no productsCart", async () => {
    mockUseAuth.productsCart = [
      {
        quantity: 2,
        product: {
          id: 1,
          name: "Produto Teste",
          price: 10,
          images: [{ url: "img.png" }]
        }
      }
    ];

    const { result } = renderHook(() => useCart());

    await act(async () => {
      await result.current.hanldeClickCreateOrder();
    });

    expect(mockCreateOrder).toHaveBeenCalledWith([
      {
        quantity: 2,
        productId: 1,
        name: "Produto Teste",
        price: 10,
        image: "img.png",
      }
    ]);

    expect(mockUseAuth.setCartChange).toHaveBeenCalled();
    expect(mockUseAuth.setProductsCart).toHaveBeenCalledWith([]);
  });

  it("hanldeClickCreateOrder não deve criar pedido sem storedUser", async () => {
    (sessionStorage.getItem as any).mockReturnValueOnce(null);

    const { result } = renderHook(() => useCart());

    await act(async () => {
      await result.current.hanldeClickCreateOrder();
    });

    expect(mockCreateOrder).not.toHaveBeenCalled();
  });

});
