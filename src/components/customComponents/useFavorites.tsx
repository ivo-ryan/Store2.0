"use client"

import { FavoriteProductType, userService } from "@/services/userService";
import { useEffect, useState } from "react"

export default function useFavorites (){
    const [ favorites, setFavorites ] = useState<FavoriteProductType[]>([]);
    const [ loading , setLoading ] = useState(false);

     const storedUser = typeof window !== "undefined"
    ? sessionStorage.getItem("user")
    : null;
   
    useEffect(() => {
         
    const fetchData = async () => {

        if(!storedUser) return 

        try{
            setLoading(true);
            const res = await userService.getAllFavorites();   
            setFavorites(res.data);

        }finally{
            setLoading(false);
        }
    };
        fetchData();
    }, [storedUser]);

    
    return{
        loading,
        favorites,
        storedUser
    }
}