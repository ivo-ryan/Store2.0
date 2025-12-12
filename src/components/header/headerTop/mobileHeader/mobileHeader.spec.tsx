import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MobileHeader from "./index";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useAuth } from "@/components/customComponents/useAuth";


vi.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

vi.mock("@/components/customComponents/useAuth", () => ({
  useAuth: vi.fn(),
}));


vi.mock("@/components/loading/spinner", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-spinner">Spinner</div>,
}));

vi.mock("../../userMenu", () => ({
  __esModule: true,
  default: (props: any) => (
    <div data-testid="mock-user-menu" data-is-logged={props.isLogged ? "true" : "false"}>
      <button data-testid="mock-user-logout" onClick={props.onLogout}>Logout</button>
    </div>
  ),
}));

const mockUseAuth = vi.mocked(useAuth);

function renderMobileHeader({
  auth = {},
  menuOpen = true,
  handleLogout = vi.fn(),
  setMenuOpen = vi.fn(),
} : {
  auth?: any;
  menuOpen?: boolean;
  handleLogout?: () => void;
  setMenuOpen?: React.Dispatch<React.SetStateAction<boolean>> 
} = {}) {
  mockUseAuth.mockReturnValue({
    productsCart: [],
    loading: false,
    user: null,
    ...auth,
  });

  const utils = render(
    <MobileHeader
      menuOpen={menuOpen}
      setMenuOpen={setMenuOpen}
      handleLogout={handleLogout}
    />
  );

  return { ...utils, setMenuOpen, handleLogout };
}

describe("MobileHeader Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    sessionStorage.clear();
  });

  it("deve renderizar menu lateral aberto quando menuOpen = true", () => {
    const { container } = renderMobileHeader({ menuOpen: true });

    const nav = container.querySelector("nav");
    expect(nav).toBeTruthy();

    expect(nav?.className).toContain("open");
  });

  it("deve renderizar menu lateral fechado quando menuOpen = false", () => {
    const { container } = renderMobileHeader({ menuOpen: false });

    const nav = container.querySelector("nav");
    expect(nav).toBeTruthy();

    expect(nav?.className).toContain("closed");
  });

  it("deve fechar o menu ao clicar no ícone FiX (close)", () => {
    const setMenuOpenMock = vi.fn();
    renderMobileHeader({ menuOpen: true, setMenuOpen: setMenuOpenMock });

    const menuHeader = screen.getByText("Menu");
    const parent = menuHeader.parentElement;
    expect(parent).toBeTruthy();

    const svg = parent!.querySelector("svg");
    expect(svg).toBeTruthy();

    fireEvent.click(svg!);

    expect(setMenuOpenMock).toHaveBeenCalledWith(false);
  });

  it("deve fechar o menu ao clicar no overlay", () => {
    const setMenuOpenMock = vi.fn();
    const { container } = renderMobileHeader({ menuOpen: true, setMenuOpen: setMenuOpenMock });

    const overlay = container.querySelector('[class*="overlay"]') as HTMLElement | null;
    expect(overlay).toBeTruthy();

    fireEvent.click(overlay!);

    expect(setMenuOpenMock).toHaveBeenCalledWith(false);
  });

  it("deve abrir e fechar o UserMenu ao clicar no ícone de usuário", () => {
    const handleLogout = vi.fn();
    const { container } = render(<MobileHeader menuOpen={true} handleLogout={handleLogout} setMenuOpen={vi.fn()} />);

    let hiddenWrapper = container.querySelector('[class*="hide"]');
    expect(hiddenWrapper).toBeTruthy();

    fireEvent.click(screen.getByText("Usuário"));

    let visibleWrapper = container.querySelector('[class*="show"]');
    expect(visibleWrapper).toBeTruthy();
    });

  it("deve chamar handleLogout quando o botão de logout do UserMenu for clicado", () => {
    const handleLogoutMock = vi.fn();
    renderMobileHeader({ menuOpen: true, handleLogout: handleLogoutMock });

    const usuarioText = screen.getByText("Usuário");
    const wrapper = usuarioText.closest("div");
    fireEvent.click(wrapper!);

    const logoutBtn = screen.getByTestId("mock-user-logout");
    fireEvent.click(logoutBtn);

    expect(handleLogoutMock).toHaveBeenCalledTimes(1);
  });

  it("deve mostrar Spinner quando loading = true", () => {
    renderMobileHeader({ auth: { loading: true } });

    const spinner = screen.getByTestId("mock-spinner");
    expect(spinner).toBeInTheDocument();
  });

  it("deve renderizar a quantidade de itens no carrinho quando loading = false", () => {
    renderMobileHeader({ auth: { productsCart: [{}, {}], loading: false } });

    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("Carrinho")).toBeInTheDocument();
  });

  it("deve renderizar link para /favorites e /cart", () => {
    renderMobileHeader({ auth: { productsCart: [], loading: false } });

    expect(screen.getByText("Favoritos")).toBeInTheDocument();
    expect(screen.getByText("Carrinho")).toBeInTheDocument();

    const favLink = screen.getByText("Favoritos").closest("a");
    expect(favLink).toHaveAttribute("href", "/favorites");

    const cartLink = screen.getByText("Carrinho").closest("a");
    expect(cartLink).toHaveAttribute("href", "/cart");
  });

  it("deve passar isLogged=true para UserMenu quando user existir", () => {
    renderMobileHeader({ auth: { user: { email: "a@a.com" } } });

    const usuarioText = screen.getByText("Usuário");
    const wrapper = usuarioText.closest("div");
    fireEvent.click(wrapper!);

    const userMenu = screen.getByTestId("mock-user-menu");
    expect(userMenu).toHaveAttribute("data-is-logged", "true");
  });

  it("deve passar isLogged=false para UserMenu quando user = null", () => {
    renderMobileHeader({ auth: { user: null } });

    const usuarioText = screen.getByText("Usuário");
    const wrapper = usuarioText.closest("div");
    fireEvent.click(wrapper!);

    const userMenu = screen.getByTestId("mock-user-menu");
    expect(userMenu).toHaveAttribute("data-is-logged", "false");
  });
});
