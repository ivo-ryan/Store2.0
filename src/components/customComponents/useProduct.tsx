"use client"

import { productsService, ProductType } from "@/services/productsServices"
import { userService } from "@/services/userService";
import { useEffect, useState } from "react"


export default function useProduct (){
    const [ product , setProduct ] = useState<ProductType[] >([]);
    const [ loading , setLoading ] = useState(true);

    
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

    return {
        product,
        loading,
        handleClickProduct
    }
}