"use client";

import { ProductType } from "@/services/productsServices";
import styles from "./styles.module.scss";
import { FiShoppingCart, FiHeart } from "react-icons/fi";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";
import useProduct from "../customComponents/useProduct";
import useCart from "../customComponents/useCart";
import useFavorite from "../customComponents/useFavorite";


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

  const { handleClickProduct} = useProduct();
  const { handleClickAddProductInCart } = useCart();
  const { productIsFavorite , handleClickFavorite, handleClickRemoveFavorite} = useFavorite(String(id));
  return (
    <div className={styles.card}  >
      {isNew && <span className={styles.newTag}>NOVO</span>}

      {
        productIsFavorite ? 
          <button className={styles.isFavorite} onClick={() => handleClickRemoveFavorite(String(id))}>
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

      <button className={styles.cartButton} onClick={() => handleClickAddProductInCart(id)}>
        <FiShoppingCart />
        Adicionar ao Carrinho
      </button>
    </div>
  );
}
