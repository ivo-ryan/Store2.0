
import Link from "next/link";
import styles from "./styles.module.scss";
import { FiUser, FiHeart, FiShoppingCart } from "react-icons/fi";
import ProductFilter from "../productFilter";


export default function HeaderTop() {
  return (
    <div className={styles.headerTop}>
      <div className={styles.logo}>
        <img src="/logo.png" alt="Logo" />
      </div>

     <ProductFilter  />

      <div className={styles.icons}>
       <Link href="/login"> <FiUser /></Link>
        <Link href="/favorites"><FiHeart /></Link>
        <Link href="/cart" > <FiShoppingCart /> </Link>
      </div>
    </div>
  );
}
