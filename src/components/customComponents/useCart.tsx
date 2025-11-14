"use client";

import { CartProduct, userService } from "@/services/userService";
import { useEffect, useState } from "react";

export default function useCart (){

    const [ products, setProducts ] = useState<CartProduct[]>([]);
    const [ loading, setLoading ] = useState(false);
    const [ favoritesChange, setFavoritesChange ] = useState<boolean>(false);
    
    const handleClickAddProductInCart = async ( productId: number, change: number = 1 ) => {
        const storedUser = sessionStorage.getItem("user");

        if(!storedUser) return 

        await userService.addProductInCart(productId, change);
        setFavoritesChange(prev => !prev);
    };

    const hanldeClickCreateOrder = async () => {
        const storedUser = sessionStorage.getItem("user");

        if(!storedUser) return ;

        const productFilter = products.map((i) => ({
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
            setProducts([]);
            setLoading(false)
        }
    }

    const handleClickRemoveProductInCart = async (productId: string) => {
        const storedUser = sessionStorage.getItem("user");

        if(!storedUser) return 

        await userService.deleteProductInCart(productId);
        setFavoritesChange(prev => !prev);
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
    }, [favoritesChange])


    
    return {
        products,
        loading,
        handleClickAddProductInCart,
        handleClickRemoveProductInCart,
        hanldeClickCreateOrder
    }
}