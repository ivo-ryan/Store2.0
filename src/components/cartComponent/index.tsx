"use client"

import Link from "next/link";
import useCart from "../customComponents/useCart";
import CartItem from "./cartItem";
import OrderSummary from "./orderSummary";
import styles from "./styles.module.scss";
import { useAuth } from "../customComponents/useAuth";
import NotLogged from "../notLogged";

export default function Cart() {
    const { products , hanldeClickCreateOrder, loading, storedUser} = useCart();
    const { handleClickAddProductInCart, handleClickRemoveProductInCart } = useAuth();

    if(!storedUser) return <NotLogged/>

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
        <Link href="/" className={styles.continueButton}>Continuar Comprando</Link>
      </section>

      <section className={styles.orderSummarySection}>
           {
            loading ? <p>Carregando...</p> :
           <OrderSummary products={products} hanldeClickCreateOrder={hanldeClickCreateOrder}/>
          }
      </section>
    </div>
  );
}