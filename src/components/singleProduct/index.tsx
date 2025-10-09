"use client"

import useProduct from "../customComponents/useProduct";
import HeaderNav from "../header/headerNav";
import styles from "./styles.module.scss";

export default function SingleProduct() {
    const { loading, product } = useProduct();
    console.log(product)

    if(loading) return <p>Carregando...</p>

    return (
        <section className={styles.sectionContainer}>
            <HeaderNav/>
        </section>
    )
}