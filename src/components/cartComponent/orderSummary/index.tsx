import { CartProduct } from "@/services/userService";
import styles from "./styles.module.scss";

type props = {
  products: CartProduct[]
}

export default function OrderSummary({ products }:props) {

  const price = products.map(i => ( i.product.price * i.quantity ));
  const totalPrice = price.reduce((acc, price) => acc + price, 0);

  return (
    <div className={styles.summary}>
      <h2>Resumo do Pedido</h2>

      {
        products.map(i => (
        <div className={styles.productsBox}>
          <div className={styles.imagePlaceholder}>
            <img src={i.product.images[0].url} alt={i.product.name} />
          </div>
          <div >
            <p className={styles.productName}>{i.product.name}</p>
            <p className={styles.productPrice}>R$ {Number(i.product.price * i.quantity).toFixed(2)}</p>
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
        <strong>R$ { totalPrice.toFixed(2) }</strong>
      </div>

      <button className={styles.checkoutButton}>
        Finalizar Compra
      </button>
    </div>
  );
}
