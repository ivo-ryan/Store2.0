import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom"
import HeaderTop from "./index";
import { vi, describe, it, expect, test, afterEach  } from "vitest";

// ------------- MOCKS -----------------

vi.mock("next/link", () => ({
  default: ({ children, href }: any) => (
    <a href={href}>{children}</a>
  ),
}));

// mock dos componentes filhos
vi.mock("../productFilter", () => ({
  __esModule: true,
  default: () => <div data-testid="product-filter" />,
}));

vi.mock("../userMenu", () => ({
  __esModule: true,
  default: ({ isLogged }: any) => (
    <div data-testid="user-menu">{isLogged ? "Logged" : "NotLogged"}</div>
  ),
}));

vi.mock("@/components/loading/spinner", () => ({
  __esModule: true,
  default: () => <div data-testid="spinner" />,
}));

vi.mock("./mobileHeader", () => ({
  __esModule: true,
  default: () => <div data-testid="mobile-header" />,
}));

// mock do useAuth
const mockLogout = vi.fn();
const mockUseAuth = vi.fn();

vi.mock("@/components/customComponents/useAuth", () => ({
  useAuth: () => mockUseAuth(),
}));



function renderHeader(customAuth?: any) {
  mockUseAuth.mockReturnValue({
    productsCart: [],
    loading: false,
    logout: mockLogout,
    ...customAuth,
  });

  return render(<HeaderTop />);
}

describe("<headerTop/> ", () => {

    afterEach(() => {
    mockUseAuth.mockReset();
    sessionStorage.clear();
  });

    it("deve renderizar o logo", () => {
  renderHeader();

  const logo = screen.getByAltText("Logo");
  expect(logo).toBeInTheDocument();
});

it("deve renderizar o ProductFilter quando search=true", () => {
  renderHeader();

  const filter = screen.getByTestId("product-filter");
  expect(filter).toBeInTheDocument();
});

it("deve exibir o número de itens no carrinho", () => {
  renderHeader({
    productsCart: [{ id: 1 }, { id: 2 }, { id: 3 }],
  });

  expect(screen.getByText("3")).toBeInTheDocument();
});

it("deve mostrar o spinner quando loading=true", () => {
  renderHeader({
    loading: true,
  });

  const spinner = screen.getByTestId("spinner");
  expect(spinner).toBeInTheDocument();
});

it("deve abrir o menu do usuário ao clicar no ícone", () => {
  renderHeader();

  const userIcon = screen.getByRole("img", { hidden: true }); // icones são svg
  fireEvent.click(userIcon);

  const menu = screen.getByTestId("user-menu");
  expect(menu).toBeInTheDocument();
});

it("Deve renderizar MobileHeader quando o menu hamburguer é clicado", () => {
  renderHeader();

  // Busca o ícone de menu pelo título do SVG
  const hamburguer = screen.getByTestId("icon-menu"); // vamos adicionar isso no componente já já

  fireEvent.click(hamburguer);

  expect(screen.getByText(/logout/i)).toBeInTheDocument(); // algo do MobileHeader
});

it("deve renderizar MobileHeader ao clicar no hamburguer", () => {
    renderHeader();


    // Deve começar mostrando "menu" (FiMenu)
    const buttonMenu = screen.getByTestId("icon-menu");
    expect(buttonMenu).toBeInTheDocument();

    // Clica → deve abrir e trocar ícone
    fireEvent.click(buttonMenu);

    const mobileHeader = screen.getByTestId("mock-mobile-header");
    expect(mobileHeader).toBeInTheDocument();
  });

  // 2️⃣ Deve chamar logout ao clicar no botão de logout dentro do UserMenu
  it("deve chamar logout ao clicar no menu de usuário", () => {
    const logoutMock = vi.fn();

    renderHeader({
      logout: logoutMock,
    });

    // Simula usuário logado
    sessionStorage.setItem("user", "true");


    // Clica no ícone de usuário para abrir o UserMenu
    const userIcon = screen.getByRole("img", { hidden: true });
    fireEvent.click(userIcon);

    const userMenu = screen.getByTestId("mock-user-menu");

    // O próprio mockUserMenu chama props.onLogout ao ser clicado
    fireEvent.click(userMenu);

    expect(logoutMock).toHaveBeenCalledTimes(1);
  });

  // 3️⃣ Deve abrir e fechar overlay ao abrir o user menu
  it("deve abrir e fechar overlay ao abrir o menu do usuário", () => {
    renderHeader();

    sessionStorage.setItem("user", "true");


    const userIcon = screen.getByRole("img", { hidden: true });

    // ABRE MENU
    fireEvent.click(userIcon);

    const overlay = screen.getByRole("presentation", { hidden: true });
    expect(overlay).toBeInTheDocument();

    // FECHA MENU
    fireEvent.click(overlay);

    expect(overlay).not.toBeInTheDocument();
  });

  // 4️⃣ Não renderiza ProductFilter quando search = false
  it("não deve renderizar ProductFilter se search = false", () => {
    renderHeader();


    const filter = screen.queryByTestId("mock-product-filter");
    expect(filter).not.toBeInTheDocument();
  });

})

