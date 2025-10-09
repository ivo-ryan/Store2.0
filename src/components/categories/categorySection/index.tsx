"use client"

import styles from "./styles.module.scss";
import CategoryCard from "../categoryCard";
import Link from "next/link";

export default function CategoriesSection() {
  const categories = [
    {
      id: "2",
      name: "Fitness",
      image: "/creatina.png",
    },
    {
      id: "1",
      name: "Eletrônicos",
      image: "/pc.png",
    },
    {
      id: "3",
      name: "Moda",
      image: "/camiseta.png",
    },
  ];

  const handleClick = (id: string) => {
    sessionStorage.setItem('category', `${id}`);
    window.dispatchEvent(new Event("categoryChange"));
  }

  return (
    <section className={styles.categories}>
      <h2>Explore as Categorias</h2>
      <div className={styles.grid}>
        {categories.map((cat, i) => (
          <Link href="/category" onClick={() => handleClick(cat.id)} key={i}>
            <CategoryCard  name={cat.name} image={cat.image} />          
          </Link>
        ))}
      </div>
    </section>
  );
}
