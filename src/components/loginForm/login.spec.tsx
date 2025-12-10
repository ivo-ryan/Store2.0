import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginPage from "./index";

vi.mock("@/components/customComponents/useAuth", () => ({
  useAuth: () => ({
    login: mockLogin
  })
}));

const mockLogin = vi.fn();

describe("LoginPage Component", () => {
  beforeEach(() => {
    mockLogin.mockReset();
  });

  it("deve renderizar o formulário inicial", () => {
    render(<LoginPage />);

    const title = screen.getByRole("heading", { name: /entrar/i })
    const email = screen.getByRole("textbox", {name: 'email'})
    const password = screen.getByLabelText(/senha/i)

    expect(title).toBeVisible();
    expect(email).toBeVisible();
    expect(password).toBeVisible();
    expect(screen.getByText("Ainda não sou cadastrado")).toBeVisible();
  });

  it("deve mostrar erro de validação ao enviar vazio", async () => {
    render(<LoginPage />);

    fireEvent.click(screen.getByRole("button", { name: /entrar/i }));

    expect(await screen.findByText("Email inválido!")).toBeInTheDocument();
    expect(await screen.findByText("Senha inválida!")).toBeInTheDocument();
  });

  it("deve chamar login com email e senha corretos", async () => {
    mockLogin.mockResolvedValueOnce(undefined);

    render(<LoginPage />);

    fireEvent.input(screen.getByRole("textbox", {name: /email/i}), {
      target: { value: "teste@gmail.com" }
    });

    fireEvent.input(screen.getByLabelText(/senha/i), {
      target: { value: "123456" } 
    })

    fireEvent.click(screen.getByRole("button", { name: "Entrar" }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith("teste@gmail.com", "123456");
    });
  });

  it("deve mostrar mensagem de erro se login falhar", async () => {
    mockLogin.mockRejectedValueOnce(new Error("erro"));

    render(<LoginPage />);

    const email = screen.getByRole("textbox", {name: 'email'})
    const password = screen.getByLabelText(/senha/i)

    fireEvent.input(email, {
      target: { value: "teste@gmail.com" }
    });

    fireEvent.input(password, {
      target: { value: "1234" }
    });

    fireEvent.click(screen.getByRole("button", { name: "Entrar" }));

    expect(await screen.findByText("Email ou senha incorretos")).toBeInTheDocument();
  });

  it("deve mostrar o RegisterForm quando clicar em 'Ainda não sou cadastrado'", () => {
    render(<LoginPage />);

    fireEvent.click(screen.getByText("Ainda não sou cadastrado"));


    expect(screen.getByRole('heading', { name: /cadastre se/i })).toBeInTheDocument();
  });
});
