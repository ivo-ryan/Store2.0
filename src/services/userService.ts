import { privateApi, publicApi } from "./api"

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

    removeFavoriteProduct: async ( productId: number) => {
        const res = await privateApi.delete("/favorites", {
            data: {
                productId
            }
        }).catch((error) => {
            console.log(error.response.data.message);
            return error.response;
        });

        return res
    }
}