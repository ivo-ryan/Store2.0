"use client"

import useFavorites from "../customComponents/useFavorites";
import ProductCard from "../productCard";
import SkeletonCard from "../skeletonCard";
import styles from "./styles.module.scss";

export default function FavoritesProducts () {
    
    const { favorites , loading , storedUser} = useFavorites();

    const products = favorites.map(p => p.product);

    if(loading) return (
        <div className={styles.grid}>{ Array.from({ length: 10 }).map((_, i) =><SkeletonCard key={i} />) }</div>
    )
    if(!storedUser) return <div>Usuário não efetuou o Login!</div>

    return (        

            <div className={styles.grid}>

                {
                    products.map(p => (
                        <ProductCard key={p.id} {...p }/>
                    ))
                }

            </div>
    )
}