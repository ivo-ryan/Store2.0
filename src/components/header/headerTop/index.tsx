"use client";

import Link from "next/link";
import styles from "./styles.module.scss";
import { FiUser, FiHeart, FiShoppingCart, FiX, FiMenu } from "react-icons/fi";
import ProductFilter from "../productFilter";
import { useAuth } from "@/components/customComponents/useAuth";
import { useState } from "react";
import UserMenu from "../userMenu";
import Spinner from "@/components/loading/spinner";
import MobileHeader from "./mobileHeader";


export default function HeaderTop({search= true}:{ search?: boolean }) {
  const { productsCart, logout, loading } = useAuth();

  const [ isOpen, setIsOpen ] = useState<"Open" | "Close">("Close");
  const [ menuOpen , setMenuOpen ] = useState<boolean>(false);
  const storedUser = typeof window !== "undefined" ? sessionStorage.getItem("user") : null;

  const isLogged = !!storedUser;

  const handleLogout = () => {
    logout();
    setIsOpen("Close");
  };


  return (
    <div className={styles.headerTop}>

      <div className={styles.left}>
        {/* Menu Hamburguer no Mobile */}
        <div
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </div>

        <div className={styles.logo}>
          <img src="/logo.png" alt="Logo" />
        </div>
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
          loading ? <div><Spinner/></div> :
          <span>{productsCart.length}</span>

        }
         <FiShoppingCart /> </Link>
      </div>
    

      {
        menuOpen && <MobileHeader
          handleLogout={handleLogout}
          isLogged
          isOpen="Open" 
          menuOpen
          setIsOpen={setIsOpen}
          setMenuOpen={setMenuOpen}
          loading
          productsCart={productsCart.length}
          
        />
      }
     
    </div>
  );
}
