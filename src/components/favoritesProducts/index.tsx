"use client"

import useFavorites from "../customComponents/useFavorites";
import styles from "./styles.module.scss";

export default function FavoritesProducts () {

    const stored = sessionStorage.getItem("token");

    console.log(stored);

    if(!stored) return <p> Usuário não logado! </p>
    
    const { favorites } = useFavorites();

    console.log(favorites)

    return (
        <>

        </>
    )
}