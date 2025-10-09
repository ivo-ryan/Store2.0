"use client"

import { productsService, ProductType } from "@/services/productsServices";
import { useEffect, useState } from "react";

export default function useCategory() {
    const [categoryId, setCategoryId] = useState<string | null>(null);
    const [products, setProducts] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState(true);

    const updateCategory = () => {
        const stored = sessionStorage.getItem("category");
        setCategoryId(stored);
    };

    useEffect(() => {
        updateCategory();
        window.addEventListener("categoryChange", updateCategory);
        return () => {
        window.removeEventListener("categoryChange", updateCategory);
        };
    }, []);


    useEffect(() => {
        if (!categoryId) {
            setProducts([]);
            setCategoryId(null);
            setLoading(false);
            return ;
        };

        let active = true

        const categoryProducts = async () => {
            setLoading(true);
            const res = await productsService.categoryProduct(categoryId);
            if(!active) return;
            setProducts(res.data.products);
            setLoading(false);
        }

        categoryProducts();

        return () => {
            active = false
        }
    }, [categoryId]);

    return {
        loading,
        products
    }
}