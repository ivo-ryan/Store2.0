"use client"

import Link from "next/link";
import useCart from "../customComponents/useCart";
import CartItem from "./cartItem";
import OrderSummary from "./orderSummary";
import styles from "./styles.module.scss";

export default function Cart() {
    const { products , handleClickAddProductInCart, handleClickRemoveProductInCart , loading} = useCart();

  return (
    <div className={styles.cartContainer}>
      <section className={styles.cartItemsSection}>
        <h2>Seu Carrinho</h2>
        <div className={styles.itemsList}>
          {
            loading && <p>Carregando...</p>
          }
          {
            products.map(i => (
                <CartItem key={i.productId} 
                handleClickAddProductInCart={handleClickAddProductInCart} 
                handleClickRemoveProductInCart={handleClickRemoveProductInCart} 
                cartProduct={i} />
            ))
          }
        </div>
        <button className={styles.continueButton}><Link href="/">Continuar Comprando</Link></button>
      </section>

      <section className={styles.orderSummarySection}>
           {
            loading ? <p>Carregando...</p> :
           <OrderSummary products={products}/>
          }
      </section>
    </div>
  );
}