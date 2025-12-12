import { render, screen, fireEvent } from "@testing-library/react";
import ProductFilter from "./index";
import { beforeEach, describe, expect, it, vi } from "vitest";
import useProduct from "@/components/customComponents/useProduct";
import { useRouter } from "next/navigation";

vi.mock("@/components/customComponents/useProduct");
vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

vi.mock("../searchBar", () => ({
  default: ({ onSearch, onSubmitSearch }: any) => (
    <div data-testid="mock-search-bar">
      <input
        data-testid="search-input"
        onChange={(e) => onSearch(e.target.value)}
      />
      <button data-testid="submit-btn" onClick={onSubmitSearch}>Buscar</button>
    </div>
  )
}));

vi.mock("../productSearch", () => ({
  __esModule: true,
  default: ({ product }: any) => (
    <div data-testid="mock-product">{product.name}</div>
  ),
}));

describe("ProductFilter", () => {
  const mockPush = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as any).mockReturnValue({ push: mockPush });
  });

  const mockProducts = [
    { id: 1, name: "Teclado Gamer" },
    { id: 2, name: "Mouse Sem Fio" },
    { id: 3, name: "Monitor 144hz" }
  ];

  it("renderiza o SearchBar", () => {
    (useProduct as any).mockReturnValue({ products: mockProducts });

    render(<ProductFilter />);

    expect(screen.getByTestId("mock-search-bar")).toBeInTheDocument();
  });

  it("filtra produtos corretamente ao digitar", () => {
    (useProduct as any).mockReturnValue({ products: mockProducts });

    render(<ProductFilter />);

    const input = screen.getByTestId("search-input");

    fireEvent.change(input, { target: { value: "mouse" } });

    expect(screen.getByTestId("mock-product")).toHaveTextContent("Mouse Sem Fio");
  });

  it("não mostra grid quando o input está vazio", () => {
    (useProduct as any).mockReturnValue({ products: mockProducts });

    render(<ProductFilter />);

    expect(screen.queryByTestId("mock-product")).not.toBeInTheDocument();
  });

it("mostra uma div vazia de nenhum produto encontrado somente após clicar no botão de buscar", async () => {
    (useProduct as any).mockReturnValue({ products: mockProducts });

  render(<ProductFilter />);

  const input = screen.getByTestId("search-input");

  fireEvent.change(input, { target: { value: "xxxxxx" } });

  expect(screen.getByTestId("no-result")).toBeInTheDocument();
});

  it("redireciona ao clicar no botão de submit", () => {
    (useProduct as any).mockReturnValue({ products: mockProducts });

    render(<ProductFilter />);

    const input = screen.getByTestId("search-input");
    const button = screen.getByTestId("submit-btn");

    fireEvent.change(input, { target: { value: "monitor" } });

    fireEvent.click(button);

    expect(mockPush).toHaveBeenCalledWith("/search?query=monitor");
  });

  it("não redireciona se input vazio", () => {
    (useProduct as any).mockReturnValue({ products: mockProducts });

    render(<ProductFilter />);

    fireEvent.click(screen.getByTestId("submit-btn"));

    expect(mockPush).not.toHaveBeenCalled();
  });

  it("esconde resultados ao clicar na grid", () => {
    (useProduct as any).mockReturnValue({ products: mockProducts });

    render(<ProductFilter />);

    const input = screen.getByTestId("search-input");

    fireEvent.change(input, { target: { value: "teclado" } });

    expect(screen.getByTestId("mock-product")).toBeInTheDocument();

    const grid = screen.getByText("Teclado Gamer").parentElement!.parentElement!;
    fireEvent.click(grid);

    expect(screen.queryByTestId("mock-product")).not.toBeInTheDocument();
  });
});
