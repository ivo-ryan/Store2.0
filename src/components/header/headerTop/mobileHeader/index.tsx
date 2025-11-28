
import { FiHeart, FiShoppingCart, FiUser, FiX } from "react-icons/fi";
import UserMenu from "../../userMenu"
import styles from "../styles.module.scss";
import Link from "next/link";
import Spinner from "@/components/loading/spinner";


type MobileProps = {
    menuOpen: boolean;
    setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isOpen: "Open" | "Close";
    isLogged: boolean;
    handleLogout: () => void;
    setIsOpen: React.Dispatch<React.SetStateAction<"Open" | "Close">>;
    productsCart: number;
    loading: boolean
}


export default function MobileHeader ({ handleLogout, isLogged , isOpen, menuOpen, setMenuOpen, setIsOpen, loading, productsCart }: MobileProps) {
    return (
    <>
   
         {/* MENU LATERAL */}

              <nav
        className={`${styles.sideMenu} ${
          menuOpen ? styles.open : styles.closed
        }`}
      >
        <div className={styles.menuHeader}>
          <span>Menu</span>
          <FiX onClick={() => setMenuOpen(false)} />
        </div>

        <div className={styles.userWrapper}>
          <FiUser
            className={styles.userIcon}
            onClick={() => setIsOpen( isOpen === "Open" ? "Close" : "Open" )}
          />
          <div className={`
              ${
                isOpen === "Close" ? styles.hide : styles.show
              }
            `}>
              
           
            <UserMenu
              isLogged={isLogged}
              onLogout={handleLogout}
            />

          </div>
          </div>

        <div className={styles.menuLinks}>
          <Link href="/favorites" onClick={() => setMenuOpen(false)}>
            Favoritos
          </Link>
          <Link href="/cart" onClick={() => setMenuOpen(false)}>
            Carrinho
          </Link>
        </div>
      </nav>

      {menuOpen && (
        <div
          className={styles.overlay}
          onClick={() => setMenuOpen(false)}
        ></div>
      )}
      
    </>
    )
}