
import { CartProduct } from "@/services/userService";
import styles from "./styles.module.scss";
import { FaTrash } from "react-icons/fa";

type props = {
  cartProduct: CartProduct;
  handleClickAddProductInCart: (productId: number, change?: number) => Promise<void>;
  handleClickRemoveProductInCart: (productId: string) => Promise<void>;
}

export default function CartItem({ 
  cartProduct: { quantity, product },
  handleClickAddProductInCart,
  handleClickRemoveProductInCart 
}:props) {

  const removeProductInCart = (productId: string) => {
    if(quantity === 1){
      handleClickRemoveProductInCart(productId);
    }

    handleClickAddProductInCart(Number(productId), -1);
  }


  return (
    <div className={styles.cartItem}>
      <div className={styles.imageBox}>
        <div className={styles.imagePlaceholder}>
          <img src={product.images[0].url} alt={product.name} />
        </div>
      </div>
      <div className={styles.infoBox}>
        <p className={styles.productName}>{product.name}</p>
        <p className={styles.productPrice}>{(product.price * quantity).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })}</p>
        <div className={styles.actions}>
          <button onClick={() => removeProductInCart(String(product.id))}>-</button>
          <span>{quantity}</span>
          <button onClick={() => handleClickAddProductInCart(product.id)}>+</button>
        </div>
      </div>
      <button className={styles.removeButton} onClick={() => handleClickRemoveProductInCart(String(product.id))} ><span>Remover</span> <FaTrash/>  </button>
    </div>
  );
}
