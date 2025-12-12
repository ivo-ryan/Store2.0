import { render, screen, fireEvent } from "@testing-library/react";
import OrderCard from "./index";
import { describe, expect, it, vi } from "vitest";
import { OrdersProps } from "@/services/userService";


vi.mock("../orderItem", () => ({
  default: ({ item }: any) => (
    <div data-testid="order-item">{item.name}</div>
  ),
}));

vi.mock("../orderStatus", () => ({
  default: ({ status }: any) => (
    <span data-testid="status-badge">{status}</span>
  ),
}));

describe("OrderCard Component", () => {

  const mockOrder: any = { 
    id: 12,
    status: "PENDING",
    createdAt: "2024-01-10T00:00:00.000Z",
    total: 199.99,
    items: [
      { 
        productId: 1,
         name: "Mouse Gamer",
         image: "url",
        orderId: 1,
        price: 99,
        quantity: 1

       },
      { 
        productId: 2,
         name: "Teclado Mecânico",
         image: "url",
        orderId: 1,
        price: 99,
        quantity: 1

       },
    ],
  };

  const mockUpdateOrderStatus = vi.fn();

  const renderComponent = () =>
    render(
      <OrderCard
        order={mockOrder}
        updateOrderStatus={mockUpdateOrderStatus}
      />
    );

  it("deve renderizar id, status, data e total formatado", () => {
    renderComponent();

    expect(screen.getByText("Pedido #12")).toBeInTheDocument();

    expect(screen.getByTestId("status-badge")).toHaveTextContent("PENDING");

    expect(screen.getByText("09/01/2024")).toBeInTheDocument();


   expect(
        screen.getByText((c) => c.includes("199,99"))
    ).toBeInTheDocument();


  });

  it("deve exibir os itens ao clicar no botão", () => {
    renderComponent();

    const toggleBtn = screen.getByRole("button", { name: "" });
    fireEvent.click(toggleBtn);

    expect(screen.getAllByTestId("order-item")).toHaveLength(2);
  });

  it("deve chamar updateOrderStatus com 'PAID' ao clicar em Pagar", () => {
    renderComponent();

    fireEvent.click(screen.getByText("Pagar"));

    expect(mockUpdateOrderStatus).toHaveBeenCalledWith(12, "PAID");
  });

  it("deve chamar updateOrderStatus com 'FAILED' ao clicar em Cancelar", () => {
    renderComponent();

    fireEvent.click(screen.getByText("Cancelar"));

    expect(mockUpdateOrderStatus).toHaveBeenCalledWith(12, "FAILED");
  });
});
