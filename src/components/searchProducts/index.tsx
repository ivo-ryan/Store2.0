"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useProduct from "@/components/customComponents/useProduct";
import styles from "./styles.module.scss";
import ProductCard from "../productCard";
import Loading from "../loading/loading";
import SkeletonCard from "../skeletonCard";

export default function SearchProduct() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || ""; 
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

  if(loading) return (
        <div className={styles.grid}>{ Array.from({ length: 10 }).map((_, i) =><SkeletonCard key={i} />) }</div>
    )

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
        <div className={styles.noResult}><p>Nenhum produto encontrado!</p> <img src="/erro.gif" alt="gif error" /></div>
      )}
    </div>
  );
}
