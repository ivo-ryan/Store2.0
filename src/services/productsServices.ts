import { api } from "./api"

export type ProductType = {
    name: string;
    id: number;
    description: string;
    price: number;
    oldPrice: number;
    featured: boolean;
    isNew: boolean;
    rating: number;
    mark: string;
    categoryId: number;
    images: [
        {

            id: number;
            url: string;
            altText?: string
        }
    ]
}


export const productsService = {
    getAll: async () => {
       const res = await api.get("/products", {
            params: {
                pageSize: 30,
                page: 1
            }
        }).catch((error) => {
            console.log(error.response.data.message);
            return error.response;
        });

        return res
    },

    getNewest: async () => {
        const res = await api.get("/products/newest").catch((error) => {
            console.log(error.response.data.message);
            return error.response;
        });

        return res;
    },

    getProductById: async (id: string) => {
        const res = await api.get(`/products/${id}`).catch((error) => {
            console.log(error.response.data.message);
            return error.response;
        });

        return res
    },

    categoryProduct: async (id: string) => {
        const res = await api.get(`/categories/${id}`).catch((error) => {
            console.log(error.response.data);
            return error.response;
        });

        return res
    }
}