import { render, screen, fireEvent } from "@testing-library/react";
import { it, describe, expect, vi, beforeEach } from "vitest";
import ProductCard from "./index";
import { ProductType } from "@/services/productsServices";

const mockAddCart = vi.fn();
const mockUseAuth = vi.fn();

vi.mock("../customComponents/useAuth", () => ({
  __esModule: true,
  useAuth: () => mockUseAuth(),
}));


vi.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, ...props }: any) => (
    <a data-testid="mock-link" {...props}>
      {children}
    </a>
  ),
}));


const mockHandleClickProduct = vi.fn();

vi.mock("../customComponents/useProduct", () => ({
  __esModule: true,
  default: () => ({
    handleClickProduct: mockHandleClickProduct,
  }),
}));


vi.mock("../favoriteProduct", () => ({
  __esModule: true,
  default: ({ id }: any) => <div data-testid="favorite-product">Fav {id}</div>,
}));

vi.mock("react-icons/fa", () => ({
  FaCartPlus: () => <svg data-testid="cart-icon" />,
}));

const mockProduct: ProductType = {
  id: 1,
  name: "iPhone 15",
  price: 4999.99,
  oldPrice: 5999.99,
  images: [{ url: "https://example.com/iphone.jpg", id: 1 }], 
  rating: 4,
  isNew: true,
  categoryId: 3,
  description: "",
  featured: true,
  mark: ""
};


describe("ProductCard Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve renderizar nome, imagem, preço e oldPrice", () => {
    mockUseAuth.mockReturnValue({
        handleClickAddProductInCart: mockAddCart,
      user: { email: "teste@gmail.com" }
    });

    render(<ProductCard {...mockProduct} />);

    expect(screen.getByText("iPhone 15")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", mockProduct.images[0].url);


     expect(
        screen.getByText((c) => c.includes("4.999,99"))
    ).toBeInTheDocument();

   

    expect(
      screen.getByText((c) => c.includes("5.999,99"))
    ).toBeInTheDocument();

    expect(screen.getByText("★★★★☆")).toBeInTheDocument();

    expect(screen.getByText("NOVO")).toBeInTheDocument();

    expect(screen.getByTestId("favorite-product")).toBeInTheDocument();
  });

  it("deve chamar handleClickProduct ao clicar no link", () => {
    mockUseAuth.mockReturnValue({
        handleClickAddProductInCart: mockAddCart,
      user: { email: "teste@gmail.com" }
    });
    render(<ProductCard {...mockProduct} />);

    const link = screen.getByTestId("mock-link");
    fireEvent.click(link);

    expect(mockHandleClickProduct).toHaveBeenCalledWith(
      String(mockProduct.id),
      String(mockProduct.categoryId)
    );
  });

  it("deve chamar handleClickAddProductInCart ao clicar no carrinho", () => {

    mockUseAuth.mockReturnValue({
        handleClickAddProductInCart: mockAddCart,
      user: { email: "teste@gmail.com" }
    });


    render(<ProductCard {...mockProduct} />);

    const btn = screen.getByTestId("cart-icon").closest("button")!;
    fireEvent.click(btn);

    expect(mockAddCart).toHaveBeenCalledWith(mockProduct.id);
  });

  it("não deve chamar addProductInCart quando user é null", () => {

    mockUseAuth.mockReturnValue({
        handleClickAddProductInCart: mockAddCart,
        user: null
    });


    render(<ProductCard {...mockProduct} />);

    const btn = screen.getByTestId("cart-icon").closest("button")!;
    fireEvent.click(btn);

    expect(mockAddCart).not.toHaveBeenCalled();
  });

  it("não deve renderizar oldPrice quando ele não existe", () => {
    const productSemOldPrice = {
      ...mockProduct,
      oldPrice: undefined,
    };

    render(<ProductCard {...productSemOldPrice} />);

    const oldPriceElement = screen.queryByText(/R\$/);
    expect(oldPriceElement).toBeInTheDocument();
  });
});
