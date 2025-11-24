"use client"

import useCategory from "@/components/customComponents/useCategory";
import ProductCard from "@/components/productCard";
import styles from "./styles.module.scss";
import SkeletonCard from "@/components/skeletonCard";



export default function CategoryProducts ({ productId }: { productId?: number } = {}) {


    const { loading, products } = useCategory({ productId });


    if (loading) return (
        <div className={styles.grid}>{ Array.from({ length: 10 }).map((_, i) =><SkeletonCard key={i} />) }</div>
    )

    
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