"use client";

import useFavorite from "@/components/customComponents/useFavorite";
import { FaHeart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import styles from "./styles.module.scss";
import Spinner from "../loading/spinner";

export default function FavoriteProduct ({id}:{id: string}) {

    const { productIsFavorite , handleClickFavorite, handleClickRemoveFavorite, favoriteLoading } = useFavorite(id);

    if(favoriteLoading) return <div ><Spinner/></div>


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