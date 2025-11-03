
import { CartProduct } from "@/services/userService";
import styles from "./styles.module.scss";

export default function CartItem({quantity, product}:CartProduct) {



  return (
    <div className={styles.cartItem}>
      <div className={styles.imageBox}>
        <div className={styles.imagePlaceholder}>
          <img src={product.images[0].url} alt={product.name} />
        </div>
      </div>
      <div className={styles.infoBox}>
        <p className={styles.productName}>{product.name}</p>
        <p className={styles.productPrice}>{Number(product.price * quantity).toFixed(2)}</p>
        <div className={styles.actions}>
          <button>-</button>
          <span>{quantity}</span>
          <button>+</button>
        </div>
      </div>
      <button className={styles.removeButton}>Remover</button>
    </div>
  );
}
