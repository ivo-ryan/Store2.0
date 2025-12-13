import { describe, it, expect, vi, beforeEach } from "vitest";
import { userService } from "./userService";
import { publicApi, privateApi } from "./api";

vi.mock("./api", () => ({
  publicApi: {
    post: vi.fn(),
  },
  privateApi: {
    get: vi.fn(),
    post: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("userService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("auth", () => {
    it("login - sucesso", async () => {
      const response = { data: { token: "123" } };
      (publicApi.post as any).mockResolvedValue(response);

      const result = await userService.login("test@email.com", "123");

      expect(publicApi.post).toHaveBeenCalledWith("/auth/login", {
        email: "test@email.com",
        password: "123",
      });
      expect(result).toBe(response);
    });

    it("login - erro", async () => {
      const error = { response: { data: { message: "Erro" } } };
      (publicApi.post as any).mockRejectedValue(error);

      const result = await userService.login("test@email.com", "123");

      expect(result).toBe(error.response);
    });
  });

  describe("favorites", () => {
    it("getAllFavorites", async () => {
      const response = { data: [] };
      (privateApi.get as any).mockResolvedValue(response);

      const result = await userService.getAllFavorites();

      expect(privateApi.get).toHaveBeenCalledWith("/favorites");
      expect(result).toBe(response);
    });

    it("addFavoriteProduct", async () => {
      const response = { data: {} };
      (privateApi.post as any).mockResolvedValue(response);

      const result = await userService.addFavoriteProduct(1);

      expect(privateApi.post).toHaveBeenCalledWith("/favorites", { productId: 1 });
      expect(result).toBe(response);
    });

    it("removeFavoriteProduct", async () => {
      const response = {};
      (privateApi.delete as any).mockResolvedValue(response);

      const result = await userService.removeFavoriteProduct("1");

      expect(privateApi.delete).toHaveBeenCalledWith("/favorites/1");
      expect(result).toBe(response);
    });
  });

  describe("cart", () => {
    it("getProductsInCart", async () => {
      const response = { data: [{ productId: 1 }] };
      (privateApi.get as any).mockResolvedValue(response);

      const result = await userService.getProductsInCart();

      expect(privateApi.get).toHaveBeenCalledWith("/cart");
      expect(result).toEqual(response.data);
    });

    it("addProductInCart", async () => {
      const response = { data: { productId: 1, quantity: 2 } };
      (privateApi.post as any).mockResolvedValue(response);

      const result = await userService.addProductInCart(1, 1);

      expect(privateApi.post).toHaveBeenCalledWith("/cart/products", {
        productId: 1,
        change: 1,
      });
      expect(result).toEqual(response.data);
    });

    it("deleteProductInCart", async () => {
      const response = {};
      (privateApi.delete as any).mockResolvedValue(response);

      const result = await userService.deleteProductInCart("1");

      expect(privateApi.delete).toHaveBeenCalledWith("/cart/products/1");
      expect(result).toBe(response);
    });
  });

  describe("orders", () => {
    it("createOrder", async () => {
      const response = { data: { id: 1 } };
      (privateApi.post as any).mockResolvedValue(response);

      const items = [{ productId: 1, name: "Produto", price: 10, quantity: 1, image: "" }];

      const result = await userService.createOrder(items);

      expect(privateApi.post).toHaveBeenCalledWith("/checkout", { items });
      expect(result).toBe(response);
    });

    it("getAllOrders", async () => {
      const response = { data: [] };
      (privateApi.get as any).mockResolvedValue(response);

      const result = await userService.getAllOrders();

      expect(privateApi.get).toHaveBeenCalledWith("/orders");
      expect(result).toBe(response);
    });

    it("updateOrder", async () => {
      const response = { id: 1, status: "PAID" };
      (privateApi.post as any).mockResolvedValue(response);

      const result = await userService.updateOrder(1, "PAID");

      expect(privateApi.post).toHaveBeenCalledWith("/payments/1/simulate", {
        status: "PAID",
      });
      expect(result).toBe(response);
    });
  });
});
