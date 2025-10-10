"use client"

import { productsService, ProductType } from "@/services/productsServices";
import { useEffect, useLayoutEffect, useState } from "react";

export default function useCategory() {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async (id: string) => {
        setLoading(true);
        try{
            const res = await productsService.categoryProduct(id);
            setProducts(res.data.products);
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

    useLayoutEffect(() => {
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