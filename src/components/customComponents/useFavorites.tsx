"use client"

import { FavoriteProductType, userService } from "@/services/userService";
import { useEffect, useState } from "react"



export default function useFavorites (){
    const [ favorites, setFavorites ] = useState<FavoriteProductType[]>([]);
    const [ loading , setLoading ] = useState(false);

    const userStorage = sessionStorage.getItem("user");
   
    useEffect(() => {
         
    const fetchData = async () => {

        if(!userStorage) return 

        try{
            setLoading(true);
            const res = await userService.getAllFavorites();   
            setFavorites(res.data);

        }finally{
            setLoading(false);
        }
    };
        fetchData();
    }, [userStorage]);

    
    return{
        loading,
        favorites
    }
}