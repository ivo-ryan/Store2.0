"use client";

import { FaLock } from "react-icons/fa";
import styles from "./styles.module.scss";
import { useRouter } from "next/navigation";

export default function NotLogged() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.box}>
       <FaLock className={styles.icon} />

        <h2 className={styles.title}>Você não está logado</h2>
        <p className={styles.text}>
          Para acessar essa funcionalidade você precisa fazer login na sua conta.
        </p>

        <button className={styles.btn} onClick={() => router.push("/login")}>
          Fazer Login
        </button>
      </div>
    </div>
  );
}
