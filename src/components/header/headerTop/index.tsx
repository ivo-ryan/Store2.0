"use client";

import Link from "next/link";
import styles from "./styles.module.scss";
import { FiUser, FiHeart, FiShoppingCart } from "react-icons/fi";
import ProductFilter from "../productFilter";
import useCart from "@/components/customComponents/useCart";
import { useAuth } from "@/components/customComponents/useAuth";


export default function HeaderTop({search= true}:{ search?: boolean }) {
  const { productsCart } = useAuth()

  return (
    <div className={styles.headerTop}>
      <div className={styles.logo}>
        <img src="/logo.png" alt="Logo" />
      </div>
    {
      search && <ProductFilter  />
    }
     

      <div className={styles.icons}>
       <Link href="/login"> <FiUser /></Link>
        <Link href="/favorites"><FiHeart /></Link>
        <Link href="/cart" className={styles.cart}> {
          <span>{productsCart.length}</span>

        }
         <FiShoppingCart /> </Link>
      </div>
    </div>
  );
}
