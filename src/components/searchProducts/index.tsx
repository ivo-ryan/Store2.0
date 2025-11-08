"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useProduct from "@/components/customComponents/useProduct";
import styles from "./styles.module.scss";
import ProductCard from "../productCard";

export default function SearchProduct() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || ""; // pega o valor da query
  const { products, loading } = useProduct();

  const [filtered, setFiltered] = useState(products);

  useEffect(() => {
    if (!query.trim()) {
      setFiltered([]);
      return;
    }

    const result = products.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );

    setFiltered(result);
  }, [query, products]);

  if(loading) return <p className={styles.loading}>Carregando...</p>;

  return (
    <div className={styles.container}>
      <h2>
        Resultados para: <span>{query}</span>
      </h2>

      {filtered.length > 0 ? (
        <div className={styles.grid}>
          {filtered.map((p) => (
                <ProductCard key={p.id} { ...p } />
          ))}
        </div>
      ) : (
        <p className={styles.noResult}>Nenhum produto encontrado 😕</p>
      )}
    </div>
  );
}
