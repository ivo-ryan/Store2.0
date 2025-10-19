"use client"

import useFavorites from "../customComponents/useFavorites";
import ProductCard from "../productCard";
import styles from "./styles.module.scss";

export default function FavoritesProducts () {

    
    const { favorites , loading } = useFavorites();

    const products = favorites.map(p => p.product);
    console.log(products)
    return (
        <>
        
            {
                loading ? <p>Página carregando</p> :
                
                <div className={styles.grid}>

                    <ProductCard {...products[0]} />

                {/* {
                    products.map(p => (
                        <ProductCard key={p.id} {...p }/>
                    ))
                } */}
            </div>
            }
        </>
    )
}