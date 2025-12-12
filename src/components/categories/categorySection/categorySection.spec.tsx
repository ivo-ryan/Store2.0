import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import CategoriesSection from "./index";

vi.mock("../categoryCard", () => ({
  default: ({ name, image }: any) => (
    <div data-testid="category-card">
      {name} - {image}
    </div>
  ),
}));

vi.stubGlobal("sessionStorage", {
  setItem: vi.fn(),
  getItem: vi.fn(),
  removeItem: vi.fn(),
});

const dispatchSpy = vi.spyOn(window, "dispatchEvent");

describe("CategoriesSection", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza o título e todas as categorias", () => {
    render(<CategoriesSection />);

    expect(screen.getByText("Explore as Categorias")).toBeInTheDocument();

    const cards = screen.getAllByTestId("category-card");
    expect(cards.length).toBe(3);

    expect(cards[0]).toHaveTextContent("Fitness");
    expect(cards[1]).toHaveTextContent("Eletrônicos");
    expect(cards[2]).toHaveTextContent("Style");
  });

  it("cada categoria possui um link para /category", () => {
    render(<CategoriesSection />);

    const links = screen.getAllByRole("link");

    links.forEach((link) => {
      expect(link.getAttribute("href")).toBe("/category");
    });
  });

  it("ao clicar em uma categoria, salva o ID no sessionStorage e dispara o evento categoryChange", () => {
    render(<CategoriesSection />);

    const categoryCards = screen.getAllByRole("link");

    fireEvent.click(categoryCards[0]);

    expect(sessionStorage.setItem).toHaveBeenCalledWith("category", "2");
    expect(dispatchSpy).toHaveBeenCalled();
  });

  it("cada clique deve salvar o ID correspondente", () => {
    render(<CategoriesSection />);

    const links = screen.getAllByRole("link");

    fireEvent.click(links[1]); 
    expect(sessionStorage.setItem).toHaveBeenCalledWith("category", "1");

    fireEvent.click(links[2]);
    expect(sessionStorage.setItem).toHaveBeenCalledWith("category", "3");
  });
});
