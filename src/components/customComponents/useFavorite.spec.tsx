import { renderHook, act, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import useFavorite from "./useFavorite";


const mockAdd = vi.fn();
const mockRemove = vi.fn();
const mockGet = vi.fn();

vi.mock("@/services/userService", () => ({
  userService: {
    addFavoriteProduct: (...args: any[]) => mockAdd(...args),
    removeFavoriteProduct: (...args: any[]) => mockRemove(...args),
    getFavoriteProduct: (...args: any[]) => mockGet(...args),
  },
}));

beforeEach(() => {
  mockAdd.mockReset();
  mockRemove.mockReset();
  mockGet.mockReset();

  const store: Record<string, string> = {};

  vi.stubGlobal("sessionStorage", {
    getItem: vi.fn((key) => store[key] || null),
    setItem: vi.fn((key, value) => (store[key] = value)),
    removeItem: vi.fn((key) => delete store[key]),
  });
});

describe("useFavorite Hook", () => {

  it("carrega estado inicial de favorito (productIsFavorite = true)", async () => {
    sessionStorage.setItem("user", "123");
    mockGet.mockResolvedValue({ data: { id: 10 } });

    const { result } = renderHook(() => useFavorite("10"));

    expect(result.current.favoriteLoading).toBe(true);

    await act(async () => {});

    expect(mockGet).toHaveBeenCalledWith("10");
    expect(result.current.productIsFavorite).toBe(true);
    expect(result.current.favoriteLoading).toBe(false);
  });

  it("productIsFavorite = false quando não existe dado", async () => {
    sessionStorage.setItem("user", "123");
    mockGet.mockResolvedValue({ data: null });

    const { result } = renderHook(() => useFavorite("10"));

    await act(async () => {});

    expect(result.current.productIsFavorite).toBe(false);
  });

  it("handleClickFavorite adiciona favorito e atualiza estado", async () => {
    sessionStorage.setItem("user", "123");
    mockGet.mockResolvedValue({ data: null });
    mockAdd.mockResolvedValue({});

    const { result } = renderHook(() => useFavorite("10"));
    await act(async () => {});

    await act(async () => {
      await result.current.handleClickFavorite(10);
    });

    expect(mockAdd).toHaveBeenCalledWith(10);
    expect(result.current.favoritesChange).toBe(true);
  });

  it("handleClickRemoveFavorite remove favorito e atualiza estado", async () => {
    sessionStorage.setItem("user", "123");
    mockGet.mockResolvedValue({ data: { id: 10 } });
    mockRemove.mockResolvedValue({});

    const { result } = renderHook(() => useFavorite("10"));
    await act(async () => {});

    await act(async () => {
      await result.current.handleClickRemoveFavorite("10");
    });

    expect(mockRemove).toHaveBeenCalledWith("10");
    expect(result.current.favoritesChange).toBe(true);
  });

  it("não faz nada quando não há usuário logado", async () => {
    mockGet.mockResolvedValue({ data: { id: 10 } });

    const { result } = renderHook(() => useFavorite("10"));

    await act(async () => {});

    expect(result.current.productIsFavorite).toBe(false);
    expect(mockGet).not.toHaveBeenCalled();
  });


  it("favoriteLoading funciona corretamente nas ações", async () => {
  sessionStorage.setItem("user", "123");
  mockGet.mockResolvedValue({ data: null });

  let resolveAdd: (value?: any) => void;
  const addPromise = new Promise((res) => {
    resolveAdd = res;
  });
  mockAdd.mockImplementation(() => addPromise);

  const { result } = renderHook(() => useFavorite("10"));

  await act(async () => {});

  act(() => {
    result.current.handleClickFavorite(10);
  });

  expect(result.current.favoriteLoading).toBe(true);

  await act(async () => {
    resolveAdd({});
    await addPromise;
  });

  expect(result.current.favoriteLoading).toBe(false);
});

});
