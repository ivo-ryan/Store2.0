"use client"

import { productsService, ProductType } from "@/services/productsServices"
import { useEffect, useState } from "react"

interface props {
    data: ProductType
}

export default function useProduct (){
    const [ product , setProduct ] = useState<ProductType[] >([]);
    const [ loading , setLoading ] = useState(true);

    const fetchProduct = async (id: string) => {
        setLoading(true);
        try {
            const res:props = await productsService.getProductById(id);
            console.log(res)
            sessionStorage.setItem("category", `${String(res.data.categoryId)}`);
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
    }

    useEffect(() => {
       updateProduct();
       window.addEventListener("productChange", updateProduct);
       return () => {
        window.removeEventListener("productChange", updateProduct);
       };
    }, []);


    return {
        product,
        loading
    }
}