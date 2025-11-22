"use client";

import { userService } from "@/services/userService";
import { useEffect, useState } from "react";

export default function useFavorite(id: string) {
  const [productIsFavorite, setProductIsFavorite] = useState<boolean>(false);
  const [favoritesChange, setFavoritesChange] = useState<boolean>(false);
  const [favoriteLoading, setFavoriteLoading] = useState<boolean>(false);
  

  const handleClickFavorite = async (productId: number) => {
    try{
      setFavoriteLoading(true);
      await userService.addFavoriteProduct(productId);
      setFavoritesChange(prev => !prev);
    }
    finally{
      setFavoriteLoading(false);
    }
  };

  const handleClickRemoveFavorite = async (productId: string) => {
    try{
      setFavoriteLoading(true);
      await userService.removeFavoriteProduct(productId);
      setFavoritesChange(prev => !prev);
    }
    finally{
      setFavoriteLoading(false);
    }
  };

  const storedUser = typeof window !== "undefined"
    ? sessionStorage.getItem("user")
    : null;

  useEffect(() => {

    if (!storedUser) {
      setProductIsFavorite(false);
      return;
    }

    if (!id) return;

    const productFavorite = async (id: string) => {
      try {
        setFavoriteLoading(true);
        const res = await userService.getFavoriteProduct(id);
        setProductIsFavorite(!!res?.data);
      } finally {
        setFavoriteLoading(false);
      }
    };

    productFavorite(id);
  }, [favoritesChange, storedUser, id]);

  return {
    favoriteLoading,
    productIsFavorite,
    handleClickFavorite,
    handleClickRemoveFavorite,
    favoritesChange
  };
}
