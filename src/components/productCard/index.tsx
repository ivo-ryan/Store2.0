"use client"


import { ProductType } from "@/services/productsServices";
import styles from "./styles.module.scss";
import { FiShoppingCart, FiHeart } from "react-icons/fi";
import Link from "next/link";


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


  const handleClick = ( id: string , categoryId: string) => {
    sessionStorage.setItem("product", `${id}`);
    sessionStorage.setItem("category", `${categoryId}`);
    window.dispatchEvent(new Event("productChange"));
  }

  return (
    <div className={styles.card}  >
      {isNew && <span className={styles.newTag}>NOVO</span>}
      <button className={styles.favorite}>
        <FiHeart />
      </button>
      
      <Link href="/product" onClick={() => handleClick(String(id), String(categoryId))}>
          
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
