"use client"

import useFavorites from "../customComponents/useFavorites";
import ProductCard from "../productCard";
import styles from "./styles.module.scss";

export default function FavoritesProducts () {
    
    const { favorites , loading } = useFavorites();

    const products = favorites.map(p => p.product);
    return (
        <>
        
            {
                loading ? <div className={styles.loadingContainer}> <p>Página carregando</p> </div> :
                
                <div className={styles.grid}>

                    {
                        products.map(p => (
                            <ProductCard key={p.id} {...p }/>
                        ))
                    }

                </div>
            }
        </>
    )
}