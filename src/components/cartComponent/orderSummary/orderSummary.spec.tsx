import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import OrderSummary from "./index";

const mockProducts = [
  {
    productId: "1",
    quantity: 2,
    product: {
      id: 1,
      name: "Produto A",
      price: 100,
      images: [{ id: 1, url: "a.png" }],
    },
  },
  {
    productId: "2",
    quantity: 1,
    product: {
      id: 2,
      name: "Produto B",
      price: 50,
      images: [{ id: 1, url: "b.png" }],
    },
  },
];

describe("OrderSummary", () => {
  const handleCreateOrder = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza título, produtos e valores corretamente", () => {
    render(
      <OrderSummary
        products={mockProducts as any}
        hanldeClickCreateOrder={handleCreateOrder}
      />
    );

    expect(screen.getByText("Resumo do Pedido")).toBeInTheDocument();

    expect(screen.getByText("Produto A")).toBeInTheDocument();
    expect(screen.getByText("Produto B")).toBeInTheDocument();

    expect(screen.getByText("X 2")).toBeInTheDocument();
    expect(screen.getByText("X 1")).toBeInTheDocument();

    expect(screen.getAllByText("R$ 100,00").length).toBeGreaterThan(0);
    expect(screen.getAllByText("R$ 50,00").length).toBeGreaterThan(0);

    expect(screen.getByText("R$ 250,00")).toBeInTheDocument();
  });

  it("renderiza campo de cupom", () => {
    render(
      <OrderSummary
        products={mockProducts as any}
        hanldeClickCreateOrder={handleCreateOrder}
      />
    );

    expect(screen.getByLabelText("Cupom de Desconto")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Insira o cupom")).toBeInTheDocument();
  });

  it("botão Finalizar Compra chama hanldeClickCreateOrder", () => {
    render(
      <OrderSummary
        products={mockProducts as any}
        hanldeClickCreateOrder={handleCreateOrder}
      />
    );

    fireEvent.click(screen.getByText("Finalizar Compra"));

    expect(handleCreateOrder).toHaveBeenCalledTimes(1);
  });
});
