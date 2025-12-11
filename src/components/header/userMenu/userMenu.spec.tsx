
import UserMenu from "./index";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

describe("UserMenu Component", () => {
  it("deve renderizar somente o link de Login quando isLogged = false", () => {
    render(<UserMenu isLogged={false} onLogout={vi.fn()} />);

    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.queryByText("Meus Pedidos")).not.toBeInTheDocument();
    expect(screen.queryByText("Logout")).not.toBeInTheDocument();
  });

  it("deve renderizar Meus Pedidos e Logout quando isLogged = true", () => {
    render(<UserMenu isLogged={true} onLogout={vi.fn()} />);

    expect(screen.getByText("Meus Pedidos")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
    expect(screen.queryByText("Login")).not.toBeInTheDocument();
  });

  it("deve chamar onLogout ao clicar no botão de Logout", () => {
    const mockLogout = vi.fn();

    render(<UserMenu isLogged={true} onLogout={mockLogout} />);

    const btnLogout = screen.getByText("Logout");
    fireEvent.click(btnLogout);

    expect(mockLogout).toHaveBeenCalledTimes(1);
  });
});
