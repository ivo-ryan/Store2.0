"use client";

import { useState } from "react";
import styles from "./styles.module.scss";

interface CompagriesProps {
  descricao: string;
  especificacoes: string;
}

export default function FeatureProduct({ descricao, especificacoes }: CompagriesProps) {
  const [activeTab, setActiveTab] = useState<"descricao" | "especificacoes">("descricao");

  return (
    <section className={styles.compagries}>
      <div className={styles.tabs}>
        <button
          className={`${styles.tabButton} ${
            activeTab === "descricao" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("descricao")}
        >
          Descrição
        </button>

        <button
          className={`${styles.tabButton} ${
            activeTab === "especificacoes" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("especificacoes")}
        >
          Especificações
        </button>
      </div>

      <div className={styles.tabContent}>
        <div
          className={`${styles.content} ${
            activeTab === "descricao" ? styles.show : styles.hide
          }`}
        >
          <p>{descricao}</p>
        </div>

        <div
          className={`${styles.content} ${
            activeTab === "especificacoes" ? styles.show : styles.hide
          }`}
        >
          <p>{especificacoes}</p>
        </div>
      </div>
    </section>
  );
}
