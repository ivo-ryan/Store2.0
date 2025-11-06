"use client";

import { useState } from "react";
import SearchBar from "../searchBar";
import  ProductSearch  from "../productSearch";
import styles from "./styles.module.scss";
import { ProductType } from "@/services/productsServices";
import useProduct from "@/components/customComponents/useProduct";


export default function ProductFilter() {

  const { products } = useProduct();

  const [filtered, setFiltered] = useState<ProductType[]>([]);
  const [ notFound, setNotFound ] = useState(false);


  const handleSearch = (query: string) => {
     if (query.trim() === "") {
    setFiltered([]); 
    setNotFound(false);
    return;
  }

    const result = products.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
    if(result.length > 0){
      setFiltered(result);
      setNotFound(false)
    }else if (result.length === 0){
      setNotFound(true);
    }
  };

  return (
    <div className={styles.container}>
      <SearchBar onSearch={handleSearch} />

      <div className={styles.grid}>
        <div className={styles.scrollBox}>
        {filtered.length > 0 && !notFound && (
          filtered.map((p) => <ProductSearch key={p.id} product={p} />)
        ) }

        {
          notFound && 
          <p className={styles.noResult}>Nenhum produto encontrado 😕</p>
        }
          
        </div>
      </div>
    </div>
  );
}
