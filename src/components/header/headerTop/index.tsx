"use client";

import Link from "next/link";
import styles from "./styles.module.scss";
import { FiUser, FiHeart, FiShoppingCart } from "react-icons/fi";
import ProductFilter from "../productFilter";
import useCart from "@/components/customComponents/useCart";


export default function HeaderTop({search= true}:{ search?: boolean }) {
  const { products , loading} = useCart();
  console.log(products.length);
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
          !loading && <span>{products.length}</span>

        }
         <FiShoppingCart /> </Link>
      </div>
    </div>
  );
}
