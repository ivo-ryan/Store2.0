"use client";

import useFavorite from "@/components/customComponents/useFavorite";
import { FaHeart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import styles from "./styles.module.scss";
import Spinner from "../loading/spinner";

export default function FavoriteProduct ({id}:{id: string}) {

    const { productIsFavorite , handleClickFavorite, handleClickRemoveFavorite, favoriteLoading , storedUser} = useFavorite(id);

    if(favoriteLoading) return <div ><Spinner/></div>

    const addProductAsFavorite = (id: number) => {
        if(!storedUser) return ;

        handleClickFavorite(id);
    }


    return (
        <>
            {
                    productIsFavorite ? 
                    <button className={styles.isFavorite} onClick={() => handleClickRemoveFavorite(id)}>
                        <FaHeart />
                    </button> 
                    : 
                    <button className={styles.favorite} onClick={() => addProductAsFavorite(Number(id))}>
                        <FiHeart />
                    </button>
                }
        </>
    )
}