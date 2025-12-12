import { render, screen, fireEvent } from "@testing-library/react";
import FavoriteProduct from "./index";
import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/components/customComponents/useFavorite", () => ({
  __esModule: true,
  default: vi.fn(), 
}));

import useFavorite from "@/components/customComponents/useFavorite";

const mockUseFavorite = useFavorite as unknown as ReturnType<typeof vi.fn>;

describe("FavoriteProduct Component", () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("Renderiza Spinner quando favoriteLoading = true", () => {
    mockUseFavorite.mockReturnValue({
      favoriteLoading: true,
      productIsFavorite: false,
      storedUser: { id: 1 },
    });

    render(<FavoriteProduct id="1" />);

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  it("Renderiza botão com coração preenchido quando productIsFavorite = true", () => {
    mockUseFavorite.mockReturnValue({
      favoriteLoading: false,
      productIsFavorite: true,
      handleClickRemoveFavorite: vi.fn(),
      storedUser: { id: 1 },
    });

    render(<FavoriteProduct id="1" />);

    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByTestId("fa-heart-icon")).toBeInTheDocument();
  });

  it("Renderiza botão com coração vazio quando productIsFavorite = false", () => {
    mockUseFavorite.mockReturnValue({
      favoriteLoading: false,
      productIsFavorite: false,
      handleClickFavorite: vi.fn(),
      storedUser: { id: 1 },
    });

    render(<FavoriteProduct id="1" />);

    expect(screen.getByTestId("fi-heart-icon")).toBeInTheDocument();
  });

  it("Chama handleClickRemoveFavorite quando o produto já é favorito", () => {
    const mockRemove = vi.fn();

    mockUseFavorite.mockReturnValue({
      favoriteLoading: false,
      productIsFavorite: true,
      handleClickRemoveFavorite: mockRemove,
      storedUser: { id: 1 },
    });

    render(<FavoriteProduct id="3" />);

    fireEvent.click(screen.getByRole("button"));

    expect(mockRemove).toHaveBeenCalledWith("3");
  });

  it("Chama handleClickFavorite quando não é favorito e tem usuário logado", () => {
    const mockAdd = vi.fn();

    mockUseFavorite.mockReturnValue({
      favoriteLoading: false,
      productIsFavorite: false,
      handleClickFavorite: mockAdd,
      storedUser: { id: 1 },
    });

    render(<FavoriteProduct id="8" />);

    fireEvent.click(screen.getByRole("button"));

    expect(mockAdd).toHaveBeenCalledWith(8);
  });

  it("Não chama função nenhuma quando storedUser = null", () => {
    const mockAdd = vi.fn();

    mockUseFavorite.mockReturnValue({
      favoriteLoading: false,
      productIsFavorite: false,
      handleClickFavorite: mockAdd,
      storedUser: null,
    });

    render(<FavoriteProduct id="5" />);

    fireEvent.click(screen.getByRole("button"));

    expect(mockAdd).not.toHaveBeenCalled();
  });
});
