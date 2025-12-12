import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const getItemSpy = vi
  .spyOn(window.sessionStorage.__proto__, "getItem")
  .mockReturnValue("user_test");

vi.mock("@/services/userService", () => ({
  userService: {
    getAllFavorites: vi.fn(),
  }
}));

import useFavorites from "./useFavorites";
import { userService } from "@/services/userService";


const mockGetAllFavorites = userService.getAllFavorites as ReturnType<typeof vi.fn>;

describe("useFavorites", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    getItemSpy.mockReturnValue("user_test");
  });

  it("carrega favoritos quando storedUser existe", async () => {
    const mocked = [{ id: 1, name: "Produto A" }];

    mockGetAllFavorites.mockResolvedValue({ data: mocked });

    const { result } = renderHook(() => useFavorites());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.favorites).toEqual(mocked);
  });

  it("mantém loading correto mesmo quando ocorre erro", async () => {
    mockGetAllFavorites.mockRejectedValue(new Error("erro"));

    const { result } = renderHook(() => useFavorites());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.favorites).toEqual([]);
  });

  it("refaz fetch quando storedUser muda", async () => {
    const mockA = [{ id: 1, name: "Produto A" }];
    const mockB = [{ id: 2, name: "Produto B" }];

    mockGetAllFavorites
      .mockResolvedValueOnce({ data: mockA })
      .mockResolvedValueOnce({ data: mockB });

    const { result, rerender } = renderHook(() => useFavorites());

    await waitFor(() =>
      expect(result.current.favorites).toEqual(mockA)
    );

    getItemSpy.mockReturnValue("user_changed");

    rerender();

    await waitFor(() =>
      expect(result.current.favorites).toEqual(mockB)
    );
  });
});
