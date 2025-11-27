"use client";

import styles from "./styles.module.scss";
import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";

export default function EmptyCart() {
  return (
    <div className={styles.container}>
      <div className={styles.iconBox}>
        <FiShoppingCart size={60} />
      </div>

      <h2>Seu carrinho está vazio</h2>
      <p>Parece que você ainda não adicionou nada.</p>

      <Link href="/" className={styles.button}>
        Ver produtos
      </Link>
    </div>
  );
}
