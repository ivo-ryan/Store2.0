"use client";

import { ProductType } from "@/services/productsServices";
import styles from "./styles.module.scss";
import { FiShoppingCart } from "react-icons/fi";
import Link from "next/link";
import useProduct from "../customComponents/useProduct";
import useCart from "../customComponents/useCart";
import FavoriteProduct from "../favoriteProduct";
import { useAuth } from "../customComponents/useAuth";


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
  const { handleClickAddProductInCart } = useAuth();
  return (
    <div className={styles.card}  >
      {isNew && <span className={styles.newTag}>NOVO</span>}

      <div className={styles.favorite}>
        <FavoriteProduct id={String(id)} />
      </div>


      <Link href="/product" onClick={() => handleClickProduct(String(id), String(categoryId))}>
          
        <img src={images[0].url} alt={name} width={300} height={300} className={styles.imgCard} />

        <h3>{name}</h3>

        <div className={styles.rating}>
          {"★".repeat(rating)}
          {"☆".repeat(5 - rating)}
        </div>

        <div className={styles.price}>
          <span className={styles.current}>{(price * 1).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })}</span>
          {oldPrice && <span className={styles.old}> {(oldPrice * 1).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })}</span>}
        </div>
      </Link>

      <button className={styles.cartButton} onClick={() => handleClickAddProductInCart(id)}>
        <FiShoppingCart />
        Adicionar ao Carrinho
      </button>
    </div>
  );
}
