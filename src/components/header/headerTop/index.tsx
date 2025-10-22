
import Link from "next/link";
import styles from "./styles.module.scss";
import { FiUser, FiHeart, FiShoppingCart, FiSearch } from "react-icons/fi";

export default function HeaderTop() {
  return (
    <div className={styles.headerTop}>
      <div className={styles.logo}>
        <img src="/logo.png" alt="Logo" />
      </div>

      <div className={styles.searchBox}>
        <input type="text" placeholder="Pesquisar produtos..." />
        <button>
          <FiSearch />
        </button>
      </div>

      <div className={styles.icons}>
       <Link href="/login"> <FiUser /></Link>
        <Link href="/favorites"><FiHeart /></Link>
        <Link href="/cart" > <FiShoppingCart /> </Link>
      </div>
    </div>
  );
}
