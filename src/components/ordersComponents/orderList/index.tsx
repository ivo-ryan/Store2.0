"use client";

import useOrders from "@/components/customComponents/useOrders";
import styles from "./styles.module.scss";
import OrderCard from "../orderCard";
import OrderEmpty from "../orderEmpty";
import Loading from "@/components/loading/loading";

export default function OrderList () {
  const { orders, updateOrderStatus, loading} = useOrders();

  if(loading) return <div className={styles.container}><Loading/></div>

  if (!orders.length) {
    return <OrderEmpty/>;
  }

  return (
    <div className={styles.list}>
      {orders.map(order => (
        <OrderCard key={order.id} order={order} updateOrderStatus={updateOrderStatus}/>
      ))}
    </div>
  )
}