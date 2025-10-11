"use client"

import { productsService, ProductType } from "@/services/productsServices";
import { useEffect, useState } from "react";

interface props {
    data: {
        id: number,
        name: string,
        position: number,
        products: ProductType[]
    }
}


export default function useCategory({ productId }: { productId?: number } = {} ) {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async (id: string) => {
        setLoading(true);
        try{
            const res:props = await productsService.categoryProduct(id);
            
            if(typeof productId === "number") {
                const productsFilter = res.data.products.filter(p => p.id !== productId);
                setProducts(productsFilter);
            }
            else{

                setProducts(res.data.products);
            }

        }
        finally{
            setLoading(false)
        }
    }

    const updateCategory = () => {
        const stored = sessionStorage.getItem("category");

        if(stored){
            fetchProducts(stored);
        }else{
            setProducts([]);
            setLoading(false)
        }
    }

    useEffect(() => {
        updateCategory();
        window.addEventListener("categoryChange", updateCategory);
        return () => {
        window.removeEventListener("categoryChange", updateCategory);
        };
    }, []);



    return {
        loading,
        products
    }
}