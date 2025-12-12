import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Cart from "./index";

vi.mock("./cartItem", () => ({
  default: () => <div data-testid="cart-item" />,
}));

vi.mock("./orderSummary", () => ({
  default: () => <div data-testid="order-summary" />,
}));

vi.mock("../notLogged", () => ({
  default: () => <div data-testid="not-logged" />,
}));

vi.mock("./emptyCart", () => ({
  default: () => <div data-testid="empty-cart" />,
}));

const mockUseCart = vi.fn();
const mockUseAuth = vi.fn();

vi.mock("../customComponents/useCart", () => ({
  default: () => mockUseCart(),
}));

vi.mock("../customComponents/useAuth", () => ({
  useAuth: () => mockUseAuth(),
}));

describe("Cart component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza NotLogged quando usuário não está logado", () => {
    mockUseCart.mockReturnValue({
      storedUser: null,
      loading: false,
      hanldeClickCreateOrder: vi.fn(),
    });

    mockUseAuth.mockReturnValue({
      productsCart: [],
      handleClickAddProductInCart: vi.fn(),
      handleClickRemoveProductInCart: vi.fn(),
    });

    render(<Cart />);

    expect(screen.getByTestId("not-logged")).toBeInTheDocument();
  });

  it("renderiza EmptyCart quando carrinho está vazio", () => {
    mockUseCart.mockReturnValue({
      storedUser: { id: 1 },
      loading: false,
      hanldeClickCreateOrder: vi.fn(),
    });

    mockUseAuth.mockReturnValue({
      productsCart: [],
      handleClickAddProductInCart: vi.fn(),
      handleClickRemoveProductInCart: vi.fn(),
    });

    render(<Cart />);

    expect(screen.getByTestId("empty-cart")).toBeInTheDocument();
  });

  it("mostra loading quando loading=true", () => {
    mockUseCart.mockReturnValue({
      storedUser: { id: 1 },
      loading: true,
      hanldeClickCreateOrder: vi.fn(),
    });

    mockUseAuth.mockReturnValue({
      productsCart: [
        { productId: "1", quantity: 1, product: {} },
      ],
      handleClickAddProductInCart: vi.fn(),
      handleClickRemoveProductInCart: vi.fn(),
    });

    render(<Cart />);

    const loadingTexts = screen.getAllByText("Carregando...");
    expect(loadingTexts.length).toBe(2);
  });

  it("renderiza carrinho e resumo quando há produtos e loading=false", () => {
    mockUseCart.mockReturnValue({
      storedUser: { id: 1 },
      loading: false,
      hanldeClickCreateOrder: vi.fn(),
    });

    mockUseAuth.mockReturnValue({
      productsCart: [
        { productId: "1", quantity: 1, product: {} },
        { productId: "2", quantity: 2, product: {} },
      ],
      handleClickAddProductInCart: vi.fn(),
      handleClickRemoveProductInCart: vi.fn(),
    });

    render(<Cart />);

    expect(screen.getByText("Seu Carrinho")).toBeInTheDocument();
    expect(screen.getAllByTestId("cart-item").length).toBe(2);
    expect(screen.getByTestId("order-summary")).toBeInTheDocument();
    expect(screen.getByText("Continuar Comprando")).toBeInTheDocument();
  });
});
