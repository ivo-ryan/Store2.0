import { OrderItemsProps } from "@/services/userService";
import styles from "./styles.module.scss";

export default function OrderItem({ item }:{ item: OrderItemsProps }) {
  return (
    <div className={styles.item}>
        <div className={styles.imgContainer}>
            <img src={item.image} alt={item.name} />
             <p>{item.name}</p>

        </div>

      <div className={styles.info}>
        Qtd: <span> {item.quantity}</span>
      </div>

      <p className={styles.price}>{ (item.price * item.quantity ).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })} </p>
    </div>
  );
}
