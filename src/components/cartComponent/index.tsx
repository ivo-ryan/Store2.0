"use client"

import Link from "next/link";
import useCart from "../customComponents/useCart";
import CartItem from "./cartItem";
import OrderSummary from "./orderSummary";
import styles from "./styles.module.scss";

export default function Cart() {
    const { products } = useCart();
    console.log(products)

  return (
    <div className={styles.cartContainer}>
      <section className={styles.cartItemsSection}>
        <h2>Seu Carrinho</h2>
        <div className={styles.itemsList}>
          {
            products.map(i => (
                <CartItem key={i.productId} {...i}/>
            ))
          }
        </div>
        <button className={styles.continueButton}><Link href="/">Continuar Comprando</Link></button>
      </section>

      <section className={styles.orderSummarySection}>
        <OrderSummary />
      </section>
    </div>
  );
}