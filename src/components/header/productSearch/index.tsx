"use client";

import { ProductType } from "@/services/productsServices";
import styles from "./styles.module.scss";

export default function ProductSearch({ product }: {product: ProductType}) {
  return (
    <div className={styles.card}>
      <div className={styles.imageBox}>
        <img src={product.images[0]?.url} alt={product.name} />
      </div>

      <div className={styles.info}>
        <h3>{product.name}</h3>
        <p>
          {(product.price * 1).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>
      </div>
    </div>
  );
}
