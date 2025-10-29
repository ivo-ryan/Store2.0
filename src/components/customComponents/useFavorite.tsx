"use client";

import { userService } from "@/services/userService";
import { useEffect, useState } from "react";

export default function useFavorite(id: string ) {
    const [ productIsFavorite, setProductIsFavorite ] = useState<boolean>(false);
    const [ favoritesChange, setFavoritesChange ] = useState<boolean>(false);
    const [ loading, setLoading ] = useState<boolean>(false);

    const handleClickFavorite = async  (productId: number) => {
        await userService.addFavoriteProduct(productId);
        setFavoritesChange(prev => !prev);
    }

    const handleClickRemoveFavorite = async ( productId: string ) => {
        await userService.removeFavoriteProduct(productId);
        setFavoritesChange(prev => !prev);
    }
 useEffect(() => {
    const storedUser = sessionStorage.getItem("user")

    if (!storedUser) return

    const productFavorite = async (id: string) => {
      try {
        setLoading(true)
        const res = await userService.getFavoriteProduct(id);
        console.log(res)
        setProductIsFavorite(!!res?.data)
      } finally {
        setLoading(false)
      }
    }

    productFavorite(id)
  }, [favoritesChange])
    return {
        loading,
        productIsFavorite,
        handleClickFavorite,
        handleClickRemoveFavorite
    }
}