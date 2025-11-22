"use client"

import useCategory from "@/components/customComponents/useCategory";
import ProductCard from "@/components/productCard";
import styles from "./styles.module.scss";
import Loading from "@/components/loading/loading";



export default function CategoryProducts ({ productId }: { productId?: number } = {}) {


    const { loading, products } = useCategory({ productId });


    if (loading) return <div className={styles.container}><Loading/></div>;

    
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