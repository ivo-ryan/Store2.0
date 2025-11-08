"use client";

import { ProductType } from "@/services/productsServices";
import styles from "./styles.module.scss";
import useProduct from "@/components/customComponents/useProduct";
import Link from "next/link";

export default function ProductSearch({ product }: {product: ProductType}) {
  const { handleClickProduct } = useProduct();

  return (
    <Link href="/product" className={styles.card} onClick={() => handleClickProduct(String(product.id), String(product.categoryId))}>
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
    </Link >
  );
}
