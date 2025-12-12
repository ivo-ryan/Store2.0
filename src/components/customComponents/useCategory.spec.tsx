import { renderHook, act } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import useCategory from "./useCategory";


const mockCategoryProduct = vi.fn();

vi.mock("@/services/productsServices", () => ({
  productsService: {
    categoryProduct: (...args: any[]) => mockCategoryProduct(...args)
  }
}));


beforeEach(() => {
  mockCategoryProduct.mockReset();

  const store: Record<string, string> = {};

  vi.stubGlobal("sessionStorage", {
    getItem: vi.fn((key) => store[key] || null),
    setItem: vi.fn((key, value) => store[key] = value),
    removeItem: vi.fn((key) => delete store[key])
  });

  vi.spyOn(window, "addEventListener");
  vi.spyOn(window, "removeEventListener");
});


const mockResponse = {
  data: {
    id: 1,
    name: "Categoria Teste",
    position: 1,
    products: [
      { id: 1, name: "P1" },
      { id: 2, name: "P2" },
      { id: 3, name: "P3" }
    ]
  }
};

describe("useCategory Hook", () => {


  it("carrega produtos quando existe category no sessionStorage", async () => {
    sessionStorage.setItem("category", "123");
    mockCategoryProduct.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useCategory());

    expect(result.current.loading).toBe(true);

    await act(async () => {});

    expect(mockCategoryProduct).toHaveBeenCalledWith("123");
    expect(result.current.products).toHaveLength(3);
    expect(result.current.loading).toBe(false);
  });


  it("remove o productId da lista se informado", async () => {
    sessionStorage.setItem("category", "123");
    mockCategoryProduct.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useCategory({ productId: 2 }));

    await act(async () => {});

    expect(result.current.products).toEqual([
      { id: 1, name: "P1" },
      { id: 3, name: "P3" }
    ]);
  });


  it("define produtos vazios quando não há category no sessionStorage", async () => {
    mockCategoryProduct.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useCategory());

    await act(async () => {});

    expect(result.current.products).toEqual([]);
    expect(result.current.loading).toBe(false);
  });


  it("escuta o evento categoryChange e recarrega os produtos", async () => {
    sessionStorage.setItem("category", "999");

    mockCategoryProduct.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useCategory());

    await act(async () => {});

    expect(mockCategoryProduct).toHaveBeenCalledWith("999");

    mockCategoryProduct.mockClear();

    await act(async () => {
      window.dispatchEvent(new Event("categoryChange"));
    });

    expect(mockCategoryProduct).toHaveBeenCalledWith("999");
  });

});
