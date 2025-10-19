"use client"

import { FavoriteProductType, userService } from "@/services/userService";
import { useEffect, useState } from "react"



export default function useFavorites (){
    const [ favorites, setFavorites ] = useState<FavoriteProductType[]>([]);
    const [ loading , setLoading ] = useState(false);
   
    useEffect(() => {
         
    const fetchData = async () => {
        setLoading(true);
        const res = await userService.getAllFavorites();   
        setLoading(false)
        setFavorites(res.data);
    };
        fetchData();
    }, []);

    
    return{
        loading,
        favorites
    }
}