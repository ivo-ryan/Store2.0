import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import CartItem from "./index";
import { ProductType } from "@/services/productsServices";

vi.mock("react-icons/fa", () => ({
  FaTrash: () => <span data-testid="trash-icon" />,
}));

const mockProduct:ProductType = {
  id: 1,
  name: "Produto Teste",
  price: 100,
  images: [{ id: 1, url: "image.png" }],
  categoryId: 1,
  description: "",
  featured: false,
  isNew: false,
  mark: "",
  rating: 2,
  oldPrice: 200

};

const createCartProduct = (quantity: number) => ({
  addAt: "",
  cartId: 1,
  productId: 1,
  quantity,
  product: mockProduct,
});

describe("CartItem", () => {
  const handleAdd = vi.fn();
  const handleRemove = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza nome, imagem, preço formatado e quantidade", () => {
    render(
      <CartItem
        cartProduct={createCartProduct(2)}
        handleClickAddProductInCart={handleAdd}
        handleClickRemoveProductInCart={handleRemove}
      />
    );

    expect(screen.getByText("Produto Teste")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", "image.png");
    expect(screen.getByText("2")).toBeInTheDocument();

    expect(screen.getByText("R$ 200,00")).toBeInTheDocument();
  });

  it("botão + chama handleClickAddProductInCart com o id", () => {
    render(
      <CartItem
        cartProduct={createCartProduct(1)}
        handleClickAddProductInCart={handleAdd}
        handleClickRemoveProductInCart={handleRemove}
      />
    );

    fireEvent.click(screen.getByText("+"));

    expect(handleAdd).toHaveBeenCalledWith(1);
  });

  it("botão - com quantity > 1 apenas decrementa", () => {
    render(
      <CartItem
        cartProduct={createCartProduct(2)}
        handleClickAddProductInCart={handleAdd}
        handleClickRemoveProductInCart={handleRemove}
      />
    );

    fireEvent.click(screen.getByText("-"));

    expect(handleRemove).not.toHaveBeenCalled();
    expect(handleAdd).toHaveBeenCalledWith(1, -1);
  });

  it("botão - com quantity === 1 remove e decrementa", () => {
    render(
      <CartItem
        cartProduct={createCartProduct(1)}
        handleClickAddProductInCart={handleAdd}
        handleClickRemoveProductInCart={handleRemove}
      />
    );

    fireEvent.click(screen.getByText("-"));

    expect(handleRemove).toHaveBeenCalledWith("1");
    expect(handleAdd).toHaveBeenCalledWith(1, -1);
  });

  it("botão Remover chama handleClickRemoveProductInCart", () => {
    render(
      <CartItem
        cartProduct={createCartProduct(2)}
        handleClickAddProductInCart={handleAdd}
        handleClickRemoveProductInCart={handleRemove}
      />
    );

    fireEvent.click(screen.getByText("Remover"));

    expect(handleRemove).toHaveBeenCalledWith("1");
  });

  it("renderiza o ícone de remover", () => {
    render(
      <CartItem
        cartProduct={createCartProduct(1)}
        handleClickAddProductInCart={handleAdd}
        handleClickRemoveProductInCart={handleRemove}
      />
    );

    expect(screen.getByTestId("trash-icon")).toBeInTheDocument();
  });
});
