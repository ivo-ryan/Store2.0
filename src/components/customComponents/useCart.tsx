"use client";

import { userService } from "@/services/userService";
import {  useState } from "react";
import { useAuth } from "./useAuth";
import useProduct from "./useProduct";
import { useRouter } from "next/navigation";

export default function useCart (){

    const { productsCart , setCartChange, setProductsCart} = useAuth();
    const { products } = useProduct();
    const [ loading, setLoading ] = useState(false);
    const router = useRouter();

     const storedUser = typeof window !== "undefined"
    ? sessionStorage.getItem("user")
    : null;

    const createSigleOrder = async (id:number) => {
        if(!storedUser) return ;

        const productFilter = products.filter(p => p.id === id);
        
        const product = {
            quantity: 1,
            productId: productFilter[0].id,
            name: productFilter[0].name,
            price: Number(productFilter[0].price),
            image: productFilter[0].images[0].url
        }

        try {
             setLoading(true)
            await userService.createOrder([product]);
        } finally{
            setLoading(false)
            router.push("/orders");
        }
    }

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
        loading,
        hanldeClickCreateOrder,
        storedUser,
        createSigleOrder
    }
}