"use client";

import useOrders from "@/components/customComponents/useOrders";
import styles from "./styles.module.scss";

export default function OrderList () {
    const { orders, loading } = useOrders();
    console.log(orders)

    return (
        <>
        </>
    )
}