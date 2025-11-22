"use client";

import { userService } from "@/services/userService";
import {  useState } from "react";
import { useAuth } from "./useAuth";

export default function useCart (){

    const { productsCart , setCartChange, setProductsCart} = useAuth();
    const [ loading, setLoading ] = useState(false);

     const storedUser = typeof window !== "undefined"
    ? sessionStorage.getItem("user")
    : null;


    const hanldeClickCreateOrder = async () => {

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


    
    return {
        products: productsCart,
        loading,
        hanldeClickCreateOrder,
        storedUser
    }
}