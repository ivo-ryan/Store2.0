
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";


vi.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, onClick }: any) => (
    <div data-testid="mock-link" onClick={onClick}>
      {children}
    </div>
  ),
}));

const mockHandleClickProduct = vi.fn();

vi.mock("@/components/customComponents/useProduct", () => {
  return {
    __esModule: true,
    default: () => ({
      handleClickProduct: mockHandleClickProduct,
    }),
  };
});

import ProductSearch from "./index";
import { ProductType } from "@/services/productsServices";

describe("ProductSearch Component", () => {
  const mockProduct: ProductType = {
    id: 1,
    name: "iPhone 15",
    description: "lorem ipsum",
    oldPrice: 3000,
    rating: 4,
    featured: true,
    isNew: false,
    mark: "generico",
    price: 7999,
    categoryId: 3,
    images: [{ 
        id: 0,
        url: "https://example.com/iphone.jpg",
        altText: undefined
    }
    ],
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve renderizar nome, imagem e preço formatado", () => {
    render(<ProductSearch product={mockProduct} />);

    expect(screen.getByText("iPhone 15")).toBeInTheDocument();

    expect(screen.getByText(/7\.999,00/)).toBeInTheDocument();

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", mockProduct.images[0].url);
    expect(img).toHaveAttribute("alt", mockProduct.name);
  });

  it("deve chamar handleClickProduct ao clicar", () => {
    render(<ProductSearch product={mockProduct} />);

    const link = screen.getByTestId("mock-link");

    fireEvent.click(link);

    expect(mockHandleClickProduct).toHaveBeenCalledTimes(1);
    expect(mockHandleClickProduct).toHaveBeenCalledWith(
      String(mockProduct.id),
      String(mockProduct.categoryId)
    );
  });
});
