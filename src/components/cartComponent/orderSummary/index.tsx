import { CartProduct } from "@/services/userService";
import styles from "./styles.module.scss";

type props = {
  products: CartProduct[];
  hanldeClickCreateOrder: () => Promise<void>
}

export default function OrderSummary({ products, hanldeClickCreateOrder }:props) {

  const price = products.map(i => ( i.product.price * i.quantity ));
  const totalPrice = price.reduce((acc, price) => acc + price, 0);
 

  return (
    <div className={styles.summary}>
      <h2>Resumo do Pedido</h2>

      {
        products.map(i => (
        <div className={styles.productsBox} key={i.productId}>
          <div className={styles.imagePlaceholder}>
            <img src={i.product.images[0].url} alt={i.product.name} />
          </div>
          <div >
            <p className={styles.productName}>{i.product.name}</p>
            <p className={styles.productPrice}>{(i.product.price * 1).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        })
    }</p>
          </div>
          <div className={styles.quantity}>
            X {i.quantity}
          </div>
      </div>
        ))
      }

      

      <div className={styles.couponBox}>
        <label htmlFor="coupon">Cupom de Desconto</label>
        <input id="coupon" type="text" placeholder="Insira o cupom" />
      </div>

      <div className={styles.totalBox}>
        <span>Total:</span>
        <strong>{ totalPrice.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
      })
    }</strong>
      </div>

      <button className={styles.checkoutButton} onClick={() => hanldeClickCreateOrder()}>
        Finalizar Compra
      </button>
    </div>
  );
}
