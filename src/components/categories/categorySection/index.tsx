
import styles from "./styles.module.scss";
import CategoryCard from "../categoryCard";

export default function CategoriesSection() {
  const categories = [
    {
      name: "Fitness",
      image: "/creatina.png",
    },
    {
      name: "Eletrônicos",
      image: "/pc.png",
    },
    {
      name: "Moda",
      image: "/camiseta.png",
    },
  ];

  return (
    <section className={styles.categories}>
      <h2>Explore as Categorias</h2>
      <div className={styles.grid}>
        {categories.map((cat, i) => (
          <CategoryCard key={i} name={cat.name} image={cat.image} />
        ))}
      </div>
    </section>
  );
}
