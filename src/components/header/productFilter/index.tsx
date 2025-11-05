"use client";

import { useState } from "react";
import { SearchBar } from "../searchBar";
import { ProductCard } from "../productSearch";
import styles from "./styles.module.scss";
import { ProductType } from "@/services/productsServices";


export function ProductFilter({ products }: { products: ProductType[] }) {
  const [filtered, setFiltered] = useState<ProductType[]>([]);

  const handleSearch = (query: string) => {
    const result = products.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
    setFiltered(result);
  };

  return (
    <div className={styles.container}>
      <SearchBar onSearch={handleSearch} />

      <div className={styles.grid}>
        {filtered.length > 0 ? (
          filtered.map((p) => <ProductCard key={p.id} product={p} />)
        ) : (
          <p className={styles.noResult}>Nenhum produto encontrado 😕</p>
        )}
      </div>
    </div>
  );
}
