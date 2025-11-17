"use client";

import { CartProduct, userService } from "@/services/userService";
import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";

export default function useCart (){

    const { productsCart , setCartChange, setProductsCart} = useAuth();
    const [ loading, setLoading ] = useState(false);

    const handleClickAddProductInCart = async ( productId: number, change: number = 1 ) => {
        const storedUser = sessionStorage.getItem("user");

        if(!storedUser) return 

        await userService.addProductInCart(productId, change);
        setCartChange(prev => !prev);
    };

    const hanldeClickCreateOrder = async () => {
        const storedUser = sessionStorage.getItem("user");

        if(!storedUser) return ;

        const productFilter = productsCart.map((i) => ({
            quantity: i.quantity, 
            productId: i.product.id,
            name: i.product.name,
            price: Number(i.product.price),
            image: i.product.images[0].url
        }));

        try{
            setLoading(true)
            await userService.createOrder(productFilter);

        }finally{
            setCartChange(prev => !prev);
            setProductsCart([]);
            setLoading(false)
        }
    }

    const handleClickRemoveProductInCart = async (productId: string) => {
        const storedUser = sessionStorage.getItem("user");

        if(!storedUser) return 

        await userService.deleteProductInCart(productId);
        setCartChange(prev => !prev);
    }


    
    return {
        products: productsCart,
        loading,
        handleClickAddProductInCart,
        handleClickRemoveProductInCart,
        hanldeClickCreateOrder
    }
}