"use client"

import Link from "next/link";
import useCart from "../customComponents/useCart";
import CartItem from "./cartItem";
import OrderSummary from "./orderSummary";
import styles from "./styles.module.scss";
import { useAuth } from "../customComponents/useAuth";
import NotLogged from "../notLogged";
import EmptyCart from "./emptyCart";

export default function Cart() {
    const { hanldeClickCreateOrder, loading, storedUser} = useCart();
    const { handleClickAddProductInCart, handleClickRemoveProductInCart, productsCart } = useAuth();

    if(!storedUser) return <NotLogged/>

    if(productsCart.length === 0) return <EmptyCart/>

  return (
    <div className={styles.cartContainer}>
      <section className={styles.cartItemsSection}>
        <h2>Seu Carrinho</h2>
        <div className={styles.itemsList}>
          {
            loading && <p>Carregando...</p>
          }
          {
            productsCart.map(i => (
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
           <OrderSummary products={productsCart} hanldeClickCreateOrder={hanldeClickCreateOrder}/>
          }
      </section>
    </div>
  );
}