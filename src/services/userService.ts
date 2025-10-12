import { api } from "./api"

export const userService = {
    login: async (email: string, password: string) => {
        const res = await api.post("/auth/login", {
            email,
            password,
        }).catch((error) => {
            console.log(error.response.data.message);
            return error.response;
        });

        return res
    },

    register: async (name: string , email: string, password: string) => {
        const res = await api.post("/register", {
            name,
            email,
            password
        }).catch((error) => {
            console.log(error.response.data.message);
            return error.response;
        });

        return res;
    }
}