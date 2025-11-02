"use client";

import useCart from "@/components/customComponents/useCart";

export default function CartProducts() {

    const { products } = useCart();
    console.log(products);

    return (
        <>
            
        </>
    )
}