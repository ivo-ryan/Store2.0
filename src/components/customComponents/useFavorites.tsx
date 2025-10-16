"use client"

import { userService } from "@/services/userService";
import { useEffect, useState } from "react"

export default function useFavorites (){
    const [ favorites, setFavorites ] = useState([]);
    
    const fetchData = async () => {
        const res = await userService.getAllFavorites();
        setFavorites(res.data.products);
    };
    useEffect(() => {
        fetchData();
    }, []);

    
    return{
        favorites
    }
}