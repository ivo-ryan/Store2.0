"use client";

import { CartProduct, userService } from "@/services/userService";
import { useEffect, useState } from "react";

export default function useCart (){

    const [ products, setProducts ] = useState<CartProduct[]>([]);
    const [ loading, setLoading ] = useState(false);

    const handleClickAddProductInCart = async ( productId: number, change: number = 1 ) => {
        const storedUser = sessionStorage.getItem("user");

        if(!storedUser) return 

        const res = await userService.addProductInCart(productId, change);
        console.log(res);
    };

    const handleClickRemoveProductInCart = async (productId: string) => {
        const storedUser = sessionStorage.getItem("user");

        if(!storedUser) return 

        const res = await userService.deleteProductInCart(productId);
        console.log(res);

    }

    const findAllProductsInCart = async () => {
        const storedUser = sessionStorage.getItem("user");

        if(!storedUser) return 

        try{
            setLoading(true);
            const res = await userService.getProductsInCart();
            setProducts(res);

        }finally{
            setLoading(false);
        }

    }

    useEffect(() => {
        findAllProductsInCart();
    }, [])


    
    return {
        products,
        loading,
        handleClickAddProductInCart,
        handleClickRemoveProductInCart
    }
}