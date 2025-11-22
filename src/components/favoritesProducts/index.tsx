"use client"

import useFavorites from "../customComponents/useFavorites";
import Loading from "../loading/loading";
import ProductCard from "../productCard";
import styles from "./styles.module.scss";

export default function FavoritesProducts () {
    
    const { favorites , loading , storedUser} = useFavorites();

    const products = favorites.map(p => p.product);

    if(loading) return <div className={styles.loading}><Loading/></div>
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