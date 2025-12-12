import { render, screen, fireEvent } from "@testing-library/react";
import SingleProduct from "./index"; 
import { beforeEach, describe, expect, it, vi } from "vitest";


vi.mock("swiper/react", () => ({
  Swiper: ({ children }: any) => <div data-testid="swiper">{children}</div>,
  SwiperSlide: ({ children }: any) => (
    <div data-testid="swiper-slide">{children}</div>
  ),
}));

vi.mock("swiper/modules", () => ({
  Navigation: {},
  Pagination: {},
}));


const mockUseProduct = vi.fn();
vi.mock("../customComponents/useProduct", () => ({
  default: () => mockUseProduct(),
}));

const mockUseAuth = vi.fn();
vi.mock("../customComponents/useAuth", () => ({
  useAuth: () => mockUseAuth(),
}));

const mockUseCart = vi.fn();
vi.mock("../customComponents/useCart", () => ({
  default: () => mockUseCart(),
}));


vi.mock("../favoriteProduct", () => ({
  default: ({ id }: any) => <div data-testid="favorite-product">{id}</div>,
}));

vi.mock("../categories/categoryProducts", () => ({
  default: ({ productId }: any) => (
    <div data-testid="category-products">{productId}</div>
  ),
}));

vi.mock("../skeletonCard", () => ({
  default: () => <div data-testid="skeleton-card">loading...</div>,
}));

vi.mock("./featureProduct", () => ({
  default: ({ descricao, especificacoes }: any) => (
    <div data-testid="feature-product">
      {descricao} - {especificacoes}
    </div>
  ),
}));


describe("SingleProduct Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockProduct = [
    {
      id: 1,
      name: "iPhone 15",
      price: 5000,
      oldPrice: 6000,
      isNew: true,
      rating: 4,
      description: "Ótimo celular",
      mark: "Apple",
      images: [{ id: 1, url: "/img1.png", altText: "Foto 1" }],
    },
  ];

  it("Renderiza SkeletonCard enquanto está carregando", () => {
    mockUseProduct.mockReturnValue({
      loading: true,
      product: [],
    });

    mockUseAuth.mockReturnValue({ user: null });
    mockUseCart.mockReturnValue({});

    render(<SingleProduct />);

    expect(screen.getAllByTestId("skeleton-card").length).toBe(10);
  });

  it("Renderiza produto quando carregado", () => {
    mockUseProduct.mockReturnValue({
      loading: false,
      product: mockProduct,
    });

    mockUseAuth.mockReturnValue({
      user: { email: "test@test.com" },
      handleClickAddProductInCart: vi.fn(),
    });

    mockUseCart.mockReturnValue({
      createSigleOrder: vi.fn(),
    });

    render(<SingleProduct />);

    expect(screen.getByText("iPhone 15")).toBeInTheDocument();

    expect(screen.getByTestId("favorite-product")).toHaveTextContent("1");
    expect(screen.getByTestId("feature-product")).toHaveTextContent(
      "Ótimo celular"
    );

    expect(screen.getByTestId("category-products")).toHaveTextContent("1");

    expect(screen.getByTestId("swiper")).toBeInTheDocument();
    expect(screen.getByTestId("swiper-slide")).toBeInTheDocument();
  });

  it("Adicionar ao carrinho chama função quando user existe", () => {
    const mockAddCart = vi.fn();

    mockUseProduct.mockReturnValue({
      loading: false,
      product: mockProduct,
    });

    mockUseAuth.mockReturnValue({
      user: { email: "a@a.com" },
      handleClickAddProductInCart: mockAddCart,
    });

    mockUseCart.mockReturnValue({
      createSigleOrder: vi.fn(),
    });

    render(<SingleProduct />);

    const cartBtn = screen.getByRole("button", { name: "" });

    fireEvent.click(cartBtn);

    expect(mockAddCart).toHaveBeenCalledWith(1);
  });

  it("Adicionar ao carrinho NÃO chama função quando user = null", () => {
    const mockAddCart = vi.fn();

    mockUseProduct.mockReturnValue({
      loading: false,
      product: mockProduct,
    });

    mockUseAuth.mockReturnValue({
      user: null,
      handleClickAddProductInCart: mockAddCart,
    });

    mockUseCart.mockReturnValue({
      createSigleOrder: vi.fn(),
    });

    render(<SingleProduct />);

    const cartBtn = screen.getByRole("button", { name: "" });

    fireEvent.click(cartBtn);

    expect(mockAddCart).not.toHaveBeenCalled();
  });

  it("Comprar chama createSigleOrder quando user existe", () => {
    const mockOrder = vi.fn();

    mockUseProduct.mockReturnValue({
      loading: false,
      product: mockProduct,
    });

    mockUseAuth.mockReturnValue({
      user: { email: "a@a.com" },
      handleClickAddProductInCart: vi.fn(),
    });

    mockUseCart.mockReturnValue({
      createSigleOrder: mockOrder,
    });

    render(<SingleProduct />);

    const buyBtn = screen.getByRole("button", { name: "Compre Agora" });

    fireEvent.click(buyBtn);

    expect(mockOrder).toHaveBeenCalledWith(1);
  });

  it("Comprar NÃO chama createSigleOrder quando user = null", () => {
    const mockOrder = vi.fn();

    mockUseProduct.mockReturnValue({
      loading: false,
      product: mockProduct,
    });

    mockUseAuth.mockReturnValue({
      user: null,
      handleClickAddProductInCart: vi.fn(),
    });

    mockUseCart.mockReturnValue({
      createSigleOrder: mockOrder,
    });

    render(<SingleProduct />);

    const buyBtn = screen.getByRole("button", { name: "Compre Agora" });

    fireEvent.click(buyBtn);

    expect(mockOrder).not.toHaveBeenCalled();
  });
});
