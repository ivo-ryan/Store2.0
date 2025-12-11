import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchBar from "./index";
import { describe, expect, it, vi } from "vitest";

describe("SearchBar Component", () => {
  it("deve chamar onSubmitSearch ao clicar no botão", async () => {
    const mockOnSearch = vi.fn();
    const mockOnSubmitSearch = vi.fn();

    render(
      <SearchBar
        onSearch={mockOnSearch}
        onSubmitSearch={mockOnSubmitSearch}
      />
    );

    const input = screen.getByPlaceholderText("Buscar produtos...");
    const button = screen.getByRole("button");

    fireEvent.change(input, { target: { value: "iphone" } });

    fireEvent.click(button);

    await waitFor(() => {
      expect(mockOnSubmitSearch).toHaveBeenCalledWith("iphone");
    });
  });

  it("deve limpar o input após o submit", async () => {
    const mockOnSearch = vi.fn();
    const mockOnSubmitSearch = vi.fn();

    render(<SearchBar onSearch={mockOnSearch} onSubmitSearch={mockOnSubmitSearch} />);

    const input = screen.getByPlaceholderText("Buscar produtos...");
    const button = screen.getByRole("button");

    fireEvent.change(input, { target: { value: "xbox" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(input).toHaveValue("");
    });
  });

  it("deve chamar onSubmitSearch ao pressionar Enter", async () => {
    const mockOnSearch = vi.fn();
    const mockOnSubmitSearch = vi.fn();

    render(<SearchBar onSearch={mockOnSearch} onSubmitSearch={mockOnSubmitSearch} />);

    const input = screen.getByPlaceholderText("Buscar produtos...");

    fireEvent.change(input, { target: { value: "teclado" } });

    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    await waitFor(() => {
      expect(mockOnSubmitSearch).toHaveBeenCalledWith("teclado");
    });
  });
});
