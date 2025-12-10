import { render , screen, waitFor, act } from "@testing-library/react";
import { expect, describe, it, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import { AuthProvider } from "./index";
import AuthContext from "./index";
import React from "react";
import SkeletonCard from "../skeletonCard";


vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

vi.mock("../skeletonCard", () => ({
  default: () => <div data-testid="skeleton-card" />,
}));

const mockLogin = vi.fn();
const mockRegister = vi.fn();
const mockGetProducts = vi.fn();
const mockAddProduct = vi.fn();
const mockDeleteProduct = vi.fn();

vi.mock("@/services/userService", () => ({
  userService: {
    login: (...args: any) => mockLogin(...args),
    register: (...args: any) => mockRegister(...args),
    getProductsInCart: () => mockGetProducts(),
    addProductInCart: (...args: any) => mockAddProduct(...args),
    deleteProductInCart: (...args: any) => mockDeleteProduct(...args),
  },
}));


const renderWithProvider = (ui: React.ReactNode) => {
  return render(<AuthProvider>{ui}</AuthProvider>);
};


describe("AuthProvider", () => {
  beforeEach(() => {
    sessionStorage.clear();
    vi.clearAllMocks();
  });

  describe("Renderização inicial", () => {
    it("renderiza os skeletons enquanto o componente não está montado", () => {
      renderWithProvider(<div> { Array.from({length: 10}).map((_, i) => <SkeletonCard key={i}/>)  }</div>);

      const skeletons = screen.queryAllByTestId("skeleton-card");

      expect(skeletons.length).toBeGreaterThan(0);
    });
  });

  describe("Login", () => {
    it("faz login corretamente e salva token + user no sessionStorage", async () => {
      mockLogin.mockResolvedValueOnce({
        status: 200,
        data: { authenticated: true, token: "abc123" },
      });

      renderWithProvider(<div>Child</div>);

      let contextValue!: any;
      render(
        <AuthProvider>
          <AuthContext.Consumer>
            {(value) => {
              contextValue = value;
              return null;
            }}
          </AuthContext.Consumer>
        </AuthProvider>
      );

      await act(async () => {
        await contextValue.login("email@test.com", "123");
      });

      expect(mockLogin).toHaveBeenCalledWith("email@test.com", "123");
      expect(sessionStorage.getItem("token")).toBe("abc123");
      expect(sessionStorage.getItem("user")).toBe(
        JSON.stringify({ email: "email@test.com" })
      );
      expect(contextValue.isAuthenticated).toBe(true);
    });
  });


  describe("Logout", () => {
    it("remove token/user e reseta o estado", async () => {
      sessionStorage.setItem("token", "abc123");
      sessionStorage.setItem("user", JSON.stringify({ email: "email@test.com" }));

      let contextValue!: any;

      render(
        <AuthProvider>
          <AuthContext.Consumer>
            {(value) => {
              contextValue = value;
              return null;
            }}
          </AuthContext.Consumer>
        </AuthProvider>
      );

      act(() => {
        contextValue.logout();
      });

      expect(sessionStorage.getItem("token")).toBeNull();
      expect(sessionStorage.getItem("user")).toBeNull();
      expect(contextValue.user).toBe(null);
      expect(contextValue.productsCart).toEqual([]);
    });
  });

  describe("Carrinho", () => {
    it("busca produtos do carrinho quando refreshCart é chamado", async () => {

      sessionStorage.setItem("token", "abc123");
      
      let contextValue!: any;
      
      render(
        <AuthProvider>
          <AuthContext.Consumer>
            {(value) => {
              contextValue = value;
              return null;
            }}
          </AuthContext.Consumer>
        </AuthProvider>
      );
      
      mockGetProducts.mockResolvedValueOnce([{ id: 1, name: "Produto X" }]);

      act(() => {
        contextValue.setCartChange((prev: boolean) => !prev);
      });      
      
      await waitFor(() => {
        expect(sessionStorage.getItem("token")).toBe("abc123")
        expect(mockGetProducts).toHaveBeenCalled();
        expect(contextValue.productsCart).toEqual([
          { id: 1, name: "Produto X" }
        ]);
      });
    });


    it("adiciona produto ao carrinho", async () => {
      sessionStorage.setItem("token", "abc123");

      let contextValue!: any;

      render(
        <AuthProvider>
          <AuthContext.Consumer>
            {(value) => {
              contextValue = value;
              return null;
            }}
          </AuthContext.Consumer>
        </AuthProvider>
      );

      mockAddProduct.mockResolvedValueOnce(true);

      await act(async () => {
        await contextValue.handleClickAddProductInCart(10, 1);
      });

      expect(mockAddProduct).toHaveBeenCalledWith(10, 1);
    });

    it("remove produto do carrinho", async () => {
      sessionStorage.setItem("token", "abc123");

      let contextValue!: any;

      render(
        <AuthProvider>
          <AuthContext.Consumer>
            {(value) => {
              contextValue = value;
              return null;
            }}
          </AuthContext.Consumer>
        </AuthProvider>
      );

      mockDeleteProduct.mockResolvedValueOnce(true);

      await act(async () => {
        await contextValue.handleClickRemoveProductInCart("20");
      });

      expect(mockDeleteProduct).toHaveBeenCalledWith("20");
    });
  });


  describe("Register", () => {
    it("registra usuário corretamente", async () => {
      mockRegister.mockResolvedValueOnce({
        status: 201,
      });

      let ctx!: any;

      render(
        <AuthProvider>
          <AuthContext.Consumer>
            {(value) => {
              ctx = value;
              return null;
            }}
          </AuthContext.Consumer>
        </AuthProvider>
      );

      let result: any;

      await act(async () => {
        result = await ctx.registerUser("User", "email@test.com", "123");
      });

      expect(mockRegister).toHaveBeenCalledWith("User", "email@test.com", "123");
      expect(result).toEqual({ register: true });
    });
  });
});
