"use client"

import useCategory from "@/components/customComponents/useCategory";
import ProductCard from "@/components/productCard";
import styles from "./styles.module.scss";



export default function CategoryProducts ({ productId }: { productId?: number } = {}) {


    const { loading, products } = useCategory({ productId })
    if (loading) return <p>Carregando...</p>;

    
    return (
         <section className={styles.grid}>
                {
                    products.map(p => (
                        <ProductCard key={p.id} {...p}/>
                    ))
                }
            </section>
    )

}