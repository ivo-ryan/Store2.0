import { privateApi, publicApi } from "./api"
import { ProductType } from "./productsServices";

export type FavoriteProductType = {
    createdAt: string;
    product: ProductType;
    productId: number;
    updatedAt: string;
    userId: number;
}

export type CartProduct = {    
    addAt: string;
    cartId: number;
    product: ProductType;
    productId: number;
    quantity: number;
}

export const userService = {
    login: async (email: string, password: string) => {
        const res = await publicApi.post("/auth/login", {
            email,
            password,
        }).catch((error) => {
            console.log(error.response.data.message);
            return error.response;
        });

        return res
    },

    register: async (name: string , email: string, password: string) => {
        const res = await publicApi.post("/register", {
            name,
            email,
            password
        }).catch((error) => {
            console.log(error.response.data.message);
            return error.response;
        });

        return res;
    },

    getUser: async (email: string) => {
        const res = await publicApi.post("/users/email", {
            email
        
        }).catch((error) => {
            console.log(error.response.data.message);
            return error.response;
        });

        return res;
    },

    getAllFavorites: async () => {
        const res = await privateApi.get("/favorites").catch((error) => {
            console.log(error.response.data.message);
            return error.response;
        });

        return res
    },

    addFavoriteProduct: async ( productId: number) => {
        const res = await privateApi.post("/favorites" ,
            {productId}
        ).catch((error) => {
            console.log(error.response.data.message);
            return error.response;
        });

        return res
    },

    getFavoriteProduct: async ( productId: string ) => {
        const res = await privateApi.get(`/favorites/${productId}`).catch((error) => {
            console.log(error.response.data.message);
            return error.response;
        });

        return res;
    },

    removeFavoriteProduct: async ( productId: string) => {
        const res = await privateApi.delete(`/favorites/${productId}`).catch((error) => {
            console.log(error.response.data.message);
            return error.response;
        });

        return res
    },

    getProductsInCart: async () => {
        const res = await privateApi.get("/cart").catch((error) => {
            console.log(error.response.message);
            return error.response;
        });

        return res.data;
    },

    addProductInCart: async (productId: number, change: number) => {
        const res = await privateApi.post("/cart/products", {
            productId,
            change
        }).catch((error) => {
            console.log(error.response.data.message);
            return error.response;
        });
        return res.data;
    },

    deleteProductInCart: async (id: string) => {
        const res = await privateApi.delete(`/cart/products/${id}`).catch((error) => {
            console.log(error.response.data.message);
            return error.response;
        });

        return res
    }
}