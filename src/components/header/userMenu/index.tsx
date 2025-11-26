"use client";

import { useState } from "react";
import styles from "./styles.module.scss";
import Link from "next/link";

interface Props {
  isLogged: boolean;
  onLogout: () => void;
}

export default function UserMenu({ isLogged, onLogout }: Props) {
    

  return (
    <>
        <div className={styles.container}>

        <Link href="/login" className={styles.item}>
          Login
        </Link>

      {isLogged && (
       <>
         <Link href="/orders" className={styles.item}>Meus Pedidos</Link>
          <button className={styles.item} onClick={onLogout}>
            Logout
          </button>

       </>
      )}

    </div>

    </>
  );
}
