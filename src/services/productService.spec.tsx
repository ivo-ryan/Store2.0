import { describe, it, expect, vi, beforeEach } from "vitest";
import { productsService } from "./productsServices";
import { publicApi } from "./api";

// Mock do publicApi
vi.mock("./api", () => ({
  publicApi: {
    get: vi.fn(),
  },
}));

describe("productsService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getAll", () => {
    it("retorna lista de produtos quando API responde corretamente", async () => {
      (publicApi.get as any).mockResolvedValue({
        data: {
          data: [{ id: 1, name: "Produto A" }],
        },
      });

      const result = await productsService.getAll();

      expect(publicApi.get).toHaveBeenCalledWith("/products", {
        params: { pageSize: 30, page: 1 },
      });
      expect(result).toEqual([{ id: 1, name: "Produto A" }]);
    });

    it("retorna null quando API falha", async () => {
      (publicApi.get as any).mockRejectedValue(new Error("Erro"));

      const result = await productsService.getAll();

      expect(result).toBeNull();
    });
  });

  describe("getNewest", () => {
    it("retorna produtos mais novos", async () => {
      (publicApi.get as any).mockResolvedValue({
        data: [{ id: 1, name: "Novo Produto" }],
      });

      const result = await productsService.getNewest();

      expect(publicApi.get).toHaveBeenCalledWith("/products/newest");
      expect(result).toEqual([{ id: 1, name: "Novo Produto" }]);
    });

    it("retorna null em erro", async () => {
      (publicApi.get as any).mockRejectedValue(new Error("Erro"));

      const result = await productsService.getNewest();

      expect(result).toBeNull();
    });
  });

  describe("getProductById", () => {
    it("retorna response quando sucesso", async () => {
      const mockResponse = { data: { id: 1 } };

      (publicApi.get as any).mockResolvedValue(mockResponse);

      const result = await productsService.getProductById("1");

      expect(publicApi.get).toHaveBeenCalledWith("/products/1");
      expect(result).toBe(mockResponse);
    });

    it("retorna error.response quando falha", async () => {
      const errorResponse = {
        response: { data: { message: "Erro" } },
      };

      (publicApi.get as any).mockRejectedValue(errorResponse);

      const result = await productsService.getProductById("1");

      expect(result).toBe(errorResponse.response);
    });
  });

  describe("categoryProduct", () => {
    it("retorna response quando sucesso", async () => {
      const mockResponse = { data: { id: 2 } };

      (publicApi.get as any).mockResolvedValue(mockResponse);

      const result = await productsService.categoryProduct("2");

      expect(publicApi.get).toHaveBeenCalledWith("/categories/2");
      expect(result).toBe(mockResponse);
    });

    it("retorna error.response quando falha", async () => {
      const errorResponse = {
        response: { data: { message: "Erro categoria" } },
      };

      (publicApi.get as any).mockRejectedValue(errorResponse);

      const result = await productsService.categoryProduct("2");

      expect(result).toBe(errorResponse.response);
    });
  });
});
