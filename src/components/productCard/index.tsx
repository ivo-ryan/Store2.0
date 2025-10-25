"use client";

import { ProductType } from "@/services/productsServices";
import styles from "./styles.module.scss";
import { FiShoppingCart, FiHeart } from "react-icons/fi";
import Link from "next/link";
import { userService } from "@/services/userService";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import useProduct from "../customComponents/useProduct";


export default function ProductCard({
  name,
  price,
  oldPrice,
  images,
  rating,
  isNew,
  id,
  categoryId
}: ProductType)
{

  const { handleClickFavorite, handleClickProduct, handleClickRemoveFavorite, productIsFavorite } = useProduct();


  return (
    <div className={styles.card}  >
      {isNew && <span className={styles.newTag}>NOVO</span>}

      {
        productIsFavorite ? 
          <button className={styles.isFavorite} onClick={() => handleClickRemoveFavorite(id)}>
            <FaHeart />
          </button> 
        : 
          <button className={styles.favorite} onClick={() => handleClickFavorite(id)}>
            <FiHeart />
          </button>
      }
      
      <Link href="/product" onClick={() => handleClickProduct(String(id), String(categoryId))}>
          
        <img src={images[0].url} alt={name} width={300} height={300} className={styles.imgCard} />

        <h3>{name}</h3>

        <div className={styles.rating}>
          {"★".repeat(rating)}
          {"☆".repeat(5 - rating)}
        </div>

        <div className={styles.price}>
          <span className={styles.current}>R$ {Number(price).toFixed(2)}</span>
          {oldPrice && <span className={styles.old}>R$ {Number(oldPrice).toFixed(2)}</span>}
        </div>
      </Link>

      <button className={styles.cartButton}>
        <FiShoppingCart />
        Adicionar ao Carrinho
      </button>
    </div>
  );
}
