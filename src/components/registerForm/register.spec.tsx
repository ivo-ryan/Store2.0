import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RegisterForm from "./index";
import { beforeEach, describe, expect, it, vi } from "vitest";


vi.mock("../customComponents/useAuth", () => ({
  useAuth: () => ({
    registerUser: vi.fn(() =>
      Promise.resolve({ register: true })
    ),
  }),
}));


describe("RegisterForm", () => {
  const setIsRegistedMock = vi.fn();

  beforeEach(() => {
    setIsRegistedMock.mockClear();
  });

  it("deve renderizar o título h2 corretamente", () => {
    render(<RegisterForm setIsRegisted={setIsRegistedMock} />);
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent(/cadastre se/i);
  });

  it("deve buscar inputs pelos roles corretos", () => {
    render(<RegisterForm setIsRegisted={setIsRegistedMock} />);

    const nomeInput = screen.getByPlaceholderText( /nome/i );
    const emailInput = screen.getByPlaceholderText(/email/i );
    const senhaInput = screen.getByPlaceholderText(/password/i); 

    expect(nomeInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(senhaInput).toBeInTheDocument();
  });

  it("deve enviar o formulário e chamar setIsRegisted(false)", async () => {
    render(<RegisterForm setIsRegisted={setIsRegistedMock} />);

    const nomeInput = screen.getByPlaceholderText( /nome/i );
    const emailInput = screen.getByPlaceholderText(/email/i );
    const senhaInput = screen.getByPlaceholderText(/password/i); 

    fireEvent.change(nomeInput, {
      target: { value: "Ivo Ryan" },
    });
    fireEvent.change(emailInput, {
      target: { value: "ivo@email.com" },
    });
    fireEvent.change(senhaInput, {
      target: { value: "12345" },
    });

    fireEvent.click(screen.getByRole("button", { name: /registrar/i }));

    await waitFor(() => {
      expect(setIsRegistedMock).toHaveBeenCalledWith(false);
    });
  });

  it("deve exibir os erros quando os inputs estiverem como valores errados", async () => {
    render(<RegisterForm setIsRegisted={setIsRegistedMock}/>);

    const nomeInput = screen.getByPlaceholderText( /nome/i );
    const emailInput = screen.getByPlaceholderText(/email/i );
    const senhaInput = screen.getByPlaceholderText(/password/i); 

    fireEvent.change(nomeInput, {
        target: { value: 'qw' }
    });

    

    fireEvent.change(emailInput, {
        target: { value: 'qdwdwd' }
    });

    fireEvent.change(senhaInput, {
        target: { value: 'wa' }
    });

    fireEvent.click(screen.getByRole("button", { name: /registrar/i }));

    expect(await screen.findByText(/Nome deve ter no mínimo 4 caracteres!/i)).toBeInTheDocument();
    expect(await screen.findByText(/Email inválido!/i)).toBeInTheDocument();
    expect(await screen.findByText(/Senha deve ter no mínimo 4 caracteres!/i)).toBeInTheDocument();
  })

});
