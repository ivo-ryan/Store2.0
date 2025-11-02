"use client";

import useFavorite from "@/components/customComponents/useFavorite";
import { FaHeart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import styles from "./styles.module.scss";

export default function FavoriteProduct ({id}:{id: string}) {

    const { productIsFavorite , handleClickFavorite, handleClickRemoveFavorite } = useFavorite(id);


    return (
        <>
            {
                    productIsFavorite ? 
                    <button className={styles.isFavorite} onClick={() => handleClickRemoveFavorite(id)}>
                        <FaHeart />
                    </button> 
                    : 
                    <button className={styles.favorite} onClick={() => handleClickFavorite(Number(id))}>
                        <FiHeart />
                    </button>
                }
        </>
    )
}