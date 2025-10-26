"use client"

import { productsService, ProductType } from "@/services/productsServices"
import { userService } from "@/services/userService";
import { useEffect, useState } from "react"


export default function useProduct (){
    const [ product , setProduct ] = useState<ProductType[] >([]);
    const [ loading , setLoading ] = useState(true);

    const [ productIsFavorite, setProductIsFavorite ] = useState<boolean>(false);
    const [ favoritesChange, setFavoritesChange ] = useState<boolean>(false);

    const handleClickFavorite = async  (productId: number) => {
      await userService.addFavoriteProduct(productId);
      setFavoritesChange(prev => !prev);
    }

    const handleClickRemoveFavorite = async ( productId: number ) => {
      await userService.removeFavoriteProduct(String(productId));
      setFavoritesChange(prev => !prev);
    }

    
  const handleClickProduct = ( id: string , categoryId: string) => {
    sessionStorage.setItem("product", `${id}`);
    sessionStorage.setItem("category", `${categoryId}`);
    window.dispatchEvent(new Event("productChange"));
  }
    
    const fetchProduct = async (id: string) => {
        setLoading(true);
        try {
            const res = await productsService.getProductById(id);
            setProduct([res.data]);
        } finally {
            setLoading(false);
        }
    }
    
    const updateProduct = () => {
        const stored = sessionStorage.getItem("product");
        if(stored){
            fetchProduct(stored);
            
        }else{
            setProduct([]);
            setLoading(false)
        }
    };
    
    useEffect(() => {
        updateProduct();
        window.addEventListener("productChange", updateProduct);
        return () => {
            window.removeEventListener("productChange", updateProduct);
        };
    }, []);

     useEffect(() => {
    const storedUser = sessionStorage.getItem("user")

    if (!storedUser || product.length === 0) return

    const productFavorite = async (id: number) => {
      try {
        setLoading(true)
        const res = await userService.getFavoriteProduct(String(id))
        setProductIsFavorite(!!res)
      } finally {
        setLoading(false)
      }
    }

    productFavorite(product[0].id)
  }, [favoritesChange, product[0]?.id])

    return {
        product,
        loading,
        productIsFavorite,
        favoritesChange,
        handleClickFavorite,
        handleClickRemoveFavorite,
        handleClickProduct
    }
}