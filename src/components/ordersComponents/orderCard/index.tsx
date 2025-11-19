import { useState } from "react";
import OrderItem from "../orderItem";
import OrderStatusBadge from "../orderStatus";
import styles from "./styles.module.scss";
import { OrdersProps } from "@/services/userService";
import { FiChevronDown } from "react-icons/fi";

type OrderProps = {
    order: OrdersProps;
    updateOrderStatus: (paymentId: number, status: "PAID" | "FAILED") => Promise<void>
}

export default function OrderCard({ order , updateOrderStatus}: OrderProps) {
      const [open, setOpen] = useState<boolean>(false);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <p><strong>Pedido #{order.id}</strong></p>
        <OrderStatusBadge status={order.status} />
      </div>

      <p className={styles.date}>
        {new Date(order.createdAt).toLocaleDateString("pt-BR")}
      </p>

      <div className={styles.right}>
          <button
            className={`${styles.toggleBtn} ${open ? styles.open : ""}`}
            onClick={() => setOpen(prev => !prev)}
          >
            <FiChevronDown size={30} />
          </button>
        </div>

          { open && (
        <div className={styles.items}>
          {order.items.map(item => (
            <OrderItem key={item.productId} item={item} />
          ))}
        </div>
      )}

      <div className={styles.container}>
      <div className={styles.buttons}>
        <button className={styles.paid} onClick={() => updateOrderStatus(order.id, "PAID")} >Pagar</button>
        <button className={styles.failed} onClick={() => updateOrderStatus(order.id, "FAILED" )} >Cancelar</button>
      </div>

      <div className={styles.total}>
        <span>Total: </span> <strong> { order.total.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
            })}    
         </strong>
      </div>

      </div>

    </div>
  );

}
