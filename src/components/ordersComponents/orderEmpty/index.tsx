"use client";

import styles from "./styles.module.scss";
import Link from "next/link";
import { FiShoppingBag } from "react-icons/fi";

export default function OrderEmpty() {
  return (
    <div className={styles.container}>
      <div className={styles.iconBox}>
        <FiShoppingBag size={60} />
      </div>

      <h2>Nenhum pedido encontrado</h2>
      <p>Você ainda não realizou nenhuma compra.</p>

      <Link href="/" className={styles.button}>
        Ir às compras
      </Link>
    </div>
  );
}
