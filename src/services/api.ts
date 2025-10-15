import axios from "axios";


const baseURL = process.env.NEXT_PUBLIC_URL;

export const publicApi = axios.create({
    baseURL
});

export const privateApi = axios.create({
    baseURL
});

privateApi.interceptors.request.use(config => {
    const token = sessionStorage.getItem("token");
    if(token) config.headers.Authorization = `Bearer ${token}`;
    return config    
});