"use client";

import useOrders from "@/components/customComponents/useOrders";
import styles from "./styles.module.scss";
import OrderCard from "../orderCard";

export default function OrderList () {
    const { orders, updateOrderStatus} = useOrders();

     if (!orders.length) {
    return <p className={styles.empty}>Nenhum pedido encontrado.</p>;
  }

  return (
    <div className={styles.list}>
      {orders.map(order => (
        <OrderCard key={order.id} order={order} updateOrderStatus={updateOrderStatus}/>
      ))}
    </div>
  )
}