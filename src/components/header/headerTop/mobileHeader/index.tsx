"use client"


import { FiHeart, FiShoppingCart, FiUser, FiX } from "react-icons/fi";
import UserMenu from "../../userMenu"
import styles from "./styles.module.scss";
import Link from "next/link";
import Spinner from "@/components/loading/spinner";
import { useState } from "react";
import { useAuth } from "@/components/customComponents/useAuth";


type MobileProps = {
    menuOpen: boolean;
    setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
    handleLogout: () => void;
}


export default function MobileHeader ({ handleLogout , menuOpen, setMenuOpen }: MobileProps) {

  const [ isOpen, setIsOpen ] = useState<"Open" | "Close">("Close");
    const { productsCart, loading, user } = useAuth();
    const isLogged = !!user;
  
    return (
    <>

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
          <div  className={styles.userIcon}
            onClick={() => setIsOpen( isOpen === "Open" ? "Close" : "Open" )}
          >
            <FiUser
           /> <p>Usuário</p>
          </div>
          <div className={`
            ${isOpen === "Close" ? styles.hide : styles.show}
          `}>
              
           <div>
            <UserMenu
              isLogged={isLogged}
              onLogout={handleLogout}
            />

           </div>

          </div>
          </div>

        <div className={styles.menuLinks}>
          <Link href="/favorites"><FiHeart /><p>Favoritos</p></Link>
        <Link href="/cart" className={styles.cart}> {
          loading ? <div className={styles.spinner}><Spinner/></div> :
          <span>{productsCart.length}</span>

        }
         <FiShoppingCart /> <p>Carrinho</p> </Link>
      
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