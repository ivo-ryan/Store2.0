import { renderHook, act, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import useProduct from "./useProduct";
import { productsService } from "@/services/productsServices";

vi.stubGlobal("sessionStorage", {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
});

const dispatchMock = vi.fn();
window.dispatchEvent = dispatchMock;

vi.mock("@/services/productsServices", () => ({
  productsService: {
    getProductById: vi.fn(),
    getAll: vi.fn(),
  },
}));

const mockProduct = {
  id: 1,
  name: "Produto Teste",
  description: "desc",
  price: 100,
  featured: false,
  isNew: true,
  rating: 5,
  mark: "Marca",
  categoryId: 22,
  images: [{ id: 1, url: "img.png" }],
};

describe("useProduct hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("carrega todos os produtos no mount (getAll)", async () => {
    (productsService.getAll as any).mockResolvedValue([mockProduct]);
    (sessionStorage.getItem as any).mockReturnValue(null);

    const { result } = renderHook(() => useProduct());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.products.length).toBe(1);
    });

    expect(productsService.getAll).toHaveBeenCalled();
    expect(result.current.loading).toBe(false);
  });

  it("carrega produto pelo ID salvo no sessionStorage", async () => {
    (sessionStorage.getItem as any).mockReturnValue("1");

    (productsService.getProductById as any).mockResolvedValue({
      data: mockProduct,
    });

    (productsService.getAll as any).mockResolvedValue([]);

    const { result } = renderHook(() => useProduct());

    await waitFor(() => {
      expect(result.current.product.length).toBe(1);
    });

    expect(productsService.getProductById).toHaveBeenCalledWith("1");
  });

  it("não busca produto quando sessionStorage não tem product", async () => {
    (sessionStorage.getItem as any).mockReturnValue(null);
    (productsService.getAll as any).mockResolvedValue([]);

    const { result } = renderHook(() => useProduct());

    await waitFor(() => {
      expect(result.current.product).toEqual([]);
    });

    expect(productsService.getProductById).not.toHaveBeenCalled();
  });

  it("handleClickProduct salva no sessionStorage e dispara evento", () => {
    const { result } = renderHook(() => useProduct());

    act(() => {
      result.current.handleClickProduct("1", "22");
    });

    expect(sessionStorage.setItem).toHaveBeenCalledWith("product", "1");
    expect(sessionStorage.setItem).toHaveBeenCalledWith("category", "22");
    expect(dispatchMock).toHaveBeenCalled();
  });

  it("updateProduct é chamado quando evento productChange é disparado (capturando handler)", async () => {
    (sessionStorage.getItem as any).mockReturnValue("1");

    (productsService.getProductById as any).mockResolvedValue({
        data: mockProduct,
    });

    (productsService.getAll as any).mockResolvedValue([]);

    const addListenerSpy = vi.spyOn(window, "addEventListener");

    const { result } = renderHook(() => useProduct());

    expect(addListenerSpy).toHaveBeenCalledWith(
        "productChange",
        expect.any(Function)
    );


     const callForProductChange = addListenerSpy.mock.calls.find(
        (call) => call[0] === "productChange"
    );
    const registeredHandler = callForProductChange ? callForProductChange[1] : null;
    expect(typeof registeredHandler).toBe("function");


    await waitFor(() => {
        expect(productsService.getProductById).toHaveBeenCalledTimes(1);
        expect(result.current.product.length).toBe(1);
    });

    act(() => {
        const event = new Event("productChange");

        if (typeof registeredHandler === "function") {
            registeredHandler(event);
        } else {
            registeredHandler!.handleEvent(event);
        }
    });

    await waitFor(() => {
        expect(productsService.getProductById).toHaveBeenCalledTimes(2);
        expect(result.current.product.length).toBe(1);
    });
    });

  it("remove listener ao desmontar o hook", () => {
    const removeSpy = vi.spyOn(window, "removeEventListener");

    const { unmount } = renderHook(() => useProduct());

    unmount();

    expect(removeSpy).toHaveBeenCalledWith(
      "productChange",
      expect.any(Function)
    );
  });
});
