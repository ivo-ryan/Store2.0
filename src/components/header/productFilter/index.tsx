"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SearchBar from "../searchBar";
import ProductSearch from "../productSearch";
import styles from "./styles.module.scss";
import { ProductType } from "@/services/productsServices";
import useProduct from "@/components/customComponents/useProduct";

export default function ProductFilter() {
  const { products } = useProduct();
  const router = useRouter();

  const [filtered, setFiltered] = useState<ProductType[]>([]);
  const [notFound, setNotFound] = useState(false);
  const [queryValue, setQueryValue] = useState("");

  const handleSearchChange = (query: string) => {
    setQueryValue(query);

    if (query.trim() === "") {
      setFiltered([]);
      setNotFound(false);
      return;
    }

    const result = products.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );

    if (result.length > 0) {
      setFiltered(result);
      setNotFound(false);
    } else {
      setFiltered([]);
      setNotFound(true);
    }
  };

  const handleSubmitSearch = () => {
    if (queryValue.trim() !== "") {
      router.push(`/search?query=${encodeURIComponent(queryValue)}`);
      setFiltered([])
    }
  };

  return (
    <div className={styles.container}>
      <SearchBar onSearch={handleSearchChange} onSubmitSearch={handleSubmitSearch} />
   {(filtered.length > 0 || notFound) && (
  <div className={styles.grid} onClick={() => setFiltered([])}>
    <div className={styles.scrollBox}>

      {filtered.length > 0 && !notFound &&
        filtered.map((p) => <ProductSearch key={p.id} product={p} />)}

      {notFound && (
        <div className={styles.noResult} data-testid="no-result">
        </div>
      )}
    </div>
  </div>
)}
    </div>
  );
}
