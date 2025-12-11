import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom"
import HeaderTop from "./index";
import { vi, describe, it, expect, test, afterEach  } from "vitest";



vi.mock("next/link", () => ({
  default: ({ children, href }: any) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock("../productFilter", () => ({
  __esModule: true,
  default: () => <div data-testid="product-filter" />,
}));

vi.mock("../userMenu", () => {
  return {
    default: function MockUserMenu(props: any) {
      return (
        <div
          data-testid="user-menu"
          data-is-logged={props.isLogged ? "true" : "false"}
          onClick={props.onLogout}
        >
          User Menu
        </div>
      );
    },
  };
});


vi.mock("@/components/loading/spinner", () => ({
  __esModule: true,
  default: () => <div data-testid="spinner" />,
}));

vi.mock("./mobileHeader", () => ({
  __esModule: true,
  default: () => <div data-testid="mobile-header" />,
}));

const mockLogout = vi.fn();
const mockUseAuth = vi.fn();

vi.mock("@/components/customComponents/useAuth", () => ({
  useAuth: () => mockUseAuth(),
}));



function renderHeader(customAuth?: any, search=true) {
  mockUseAuth.mockReturnValue({
    productsCart: [],
    loading: false,
    logout: mockLogout,
    ...customAuth,
  });

  return render(<HeaderTop search={search}/>);
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

  const userIcon = screen.getByTestId("user")
  fireEvent.click(userIcon);

  const menu = screen.getByTestId("user-menu");
  expect(menu).toBeInTheDocument();
});

it("Deve renderizar MobileHeader quando o menu hamburguer é clicado", () => {
  renderHeader();

  const hamburguer = screen.getByTestId("icon-menu"); 

  fireEvent.click(hamburguer);

  const mobileHeader = screen.getByTestId("mobile-header");
  expect(mobileHeader).toBeVisible();
});

it("deve renderizar MobileHeader ao clicar no hamburguer", () => {
    renderHeader();

    const buttonMenu = screen.getByTestId("icon-menu");
    expect(buttonMenu).toBeInTheDocument();

    fireEvent.click(buttonMenu);

    const mobileHeader = screen.getByTestId("mobile-header");
    expect(mobileHeader).toBeInTheDocument();
  });


  it("deve chamar logout ao clicar no menu de usuário", () => {
    const logout = mockLogout;

    renderHeader({
      logout: logout,
    });

    sessionStorage.setItem("user", "true");

    const userIcon = screen.getByTestId("user"); 
    fireEvent.click(userIcon);

    const userMenu = screen.getByTestId("user-menu");

    fireEvent.click(userMenu);

    expect(logout).toHaveBeenCalledTimes(1);
  });

  it("deve abrir e fechar overlay ao abrir o menu do usuário", () => {
    renderHeader();

    sessionStorage.setItem("user", "true");


    const userIcon = screen.getByTestId("user");
    fireEvent.click(userIcon);

    const overlay = screen.getByTestId("overlay")
    expect(overlay).toBeInTheDocument();
    fireEvent.click(overlay);

    expect(overlay).not.toBeInTheDocument();
  });

  it("não deve renderizar ProductFilter se search = false", () => {
    renderHeader({},false);


    const filter = screen.queryByTestId("product-filter");
    expect(filter).not.toBeInTheDocument();
  });

})

