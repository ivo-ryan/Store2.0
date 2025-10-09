"use client"

import { productsService, ProductType } from "@/services/productsServices"
import { useEffect, useState } from "react"

export default function useProduct (){
    const [ product , setProduct ] = useState<ProductType | {} >({});
    const [ productId, setProductId ] = useState<string | null>(null);
    const [ loading , setLoading ] = useState(true);

    const updateProduct = () => {
        const stored = sessionStorage.getItem("product");
        setProductId(stored);
    }

    useEffect(() => {
       updateProduct();
       window.addEventListener("productChange", updateProduct);
       return () => {
        window.removeEventListener("productChange", updateProduct);
       };
    }, []);

    useEffect(() => {
        if(!productId){
            setProduct({});
            setLoading(false);
            return;
        };

        const fetchData = async () => {
            setLoading(true);
            const res = await productsService.getProductById(productId);
            setProduct(res.data);
            setLoading(false);
        }

        fetchData();
    }, [productId]);


    return {
        product,
        loading
    }
}