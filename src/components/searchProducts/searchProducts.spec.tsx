import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import SearchProduct from "./index";


const mockGet = vi.fn();

vi.mock("next/navigation", () => ({
  useSearchParams: () => ({
    get: mockGet,
  }),
}));

const mockProducts = [
  { id: 1, name: "iPhone 15", categoryId: 3, images: [{ url: "" }] },
  { id: 2, name: "Samsung S23", categoryId: 2, images: [{ url: "" }] },
];

let mockLoading = false;

vi.mock("../customComponents/useProduct", () => ({
  __esModule: true,
  default: () => ({
    products: mockProducts,
    loading: mockLoading,
  }),
}));

const MockProductCard = vi.fn((props) => {
  return <div data-testid="product-card">Produto {props.name}</div>;
});

vi.mock("../productCard", () => ({
  __esModule: true,
  default: (props: any) => MockProductCard(props),
}));


describe("SearchProduct Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockLoading = false;
  });

  it("deve exibir skeletons enquanto loading = true", () => {
    mockLoading = true;
    mockGet.mockReturnValue("iphone");

    render(<SearchProduct />);

    const skeletons = screen.getAllByTestId("skeleton-card");
    expect(skeletons.length).toBe(10);
  });

  it("deve exibir 'Nenhum produto encontrado!' quando query está vazia", () => {
    mockGet.mockReturnValue("");

    render(<SearchProduct />);

    expect(screen.getByText("Nenhum produto encontrado!")).toBeInTheDocument();
  });

  it("deve exibir 'Nenhum produto encontrado!' quando nenhum produto corresponde", () => {
    mockGet.mockReturnValue("teclado");

    render(<SearchProduct />);

    expect(screen.getByText("Nenhum produto encontrado!")).toBeInTheDocument();
  });

  it("deve renderizar ProductCard para produtos filtrados", async () => {
    mockGet.mockReturnValue("iphone");

    render(<SearchProduct />);

    await waitFor(() => {
      expect(screen.getByTestId("product-card")).toBeInTheDocument();
    });

     expect(MockProductCard).toHaveBeenCalledWith(
    expect.objectContaining({
      id: 1,
      name: "iPhone 15"
    })
  );
  });
});
