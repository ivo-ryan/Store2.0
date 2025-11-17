"use client";

import Link from "next/link";
import styles from "./styles.module.scss";
import { FiUser, FiHeart, FiShoppingCart } from "react-icons/fi";
import ProductFilter from "../productFilter";
import { useAuth } from "@/components/customComponents/useAuth";
import { useState } from "react";
import UserMenu from "../userMenu";


export default function HeaderTop({search= true}:{ search?: boolean }) {
  const { productsCart, logout } = useAuth();

  const [ isOpen, setIsOpen ] = useState<"Open" | "Close">("Close");
  const storedUser = typeof window !== "undefined" ? sessionStorage.getItem("user") : null;

  const isLogged = !!storedUser;

  const handleLogout = () => {
    logout();
    setIsOpen("Close");
  };

  return (
    <div className={styles.headerTop}>
      <div className={styles.logo}>
        <img src="/logo.png" alt="Logo" />
      </div>
    {
      search && <ProductFilter  />
    }
       {
              isOpen === "Open" && 
    <div className={styles.overlay} onClick={() => setIsOpen("Close")}></div>
            }
     

      <div className={styles.icons}>

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

        <Link href="/favorites"><FiHeart /></Link>
        <Link href="/cart" className={styles.cart}> {
          <span>{productsCart.length}</span>

        }
         <FiShoppingCart /> </Link>
      </div>
    </div>
  );
}
