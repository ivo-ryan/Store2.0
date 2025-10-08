"use client"

import Footer from "@/components/footer";
import Header from "@/components/header";
import ProductCard from "@/components/productCard";
import styles from "./styles.module.scss";
import { productsService, ProductType } from "@/services/productsServices";
import { useEffect, useState } from "react";

export default function Page () {
    const [categoryId, setCategoryId] = useState<string | null>(null);
    const [products, setProducts] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const stored = sessionStorage.getItem("category");
        if (stored) setCategoryId(stored);
        else setLoading(false);
    }, []);


    useEffect(() => {
        if (!categoryId) return;

        const categoryProducts = async () => {
            setLoading(true);
            const res = await productsService.categoryProduct(categoryId);
            setProducts(res.data.products);
            setLoading(false);
        }

        categoryProducts();
    }, [categoryId]);

    if (loading) return <p>Carregando...</p>;

    return (
        <>
            <Header/>

            <section className={styles.grid}>
                {
                    products.map(p => (
                        <ProductCard key={p.id} {...p}/>
                    ))
                }
            </section>

            <Footer/>
        </>
    )
}