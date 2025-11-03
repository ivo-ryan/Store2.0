import styles from "./styles.module.scss";

export default function OrderSummary() {


  return (
    <div className={styles.summary}>
      <h2>Resumo do Pedido</h2>

      <div className={styles.productBox}>
        <div className={styles.imagePlaceholder}></div>
        <div>
          <p className={styles.productName}>Produto em destaque</p>
          <p className={styles.productPrice}>$89.99</p>
        </div>
      </div>

      <div className={styles.couponBox}>
        <label htmlFor="coupon">Cupom de Desconto</label>
        <input id="coupon" type="text" placeholder="Insira o cupom" />
      </div>

      <div className={styles.totalBox}>
        <span>Total:</span>
        <strong>$199.99</strong>
      </div>

      <button className={styles.checkoutButton}>
        Finalizar Compra
      </button>
    </div>
  );
}
