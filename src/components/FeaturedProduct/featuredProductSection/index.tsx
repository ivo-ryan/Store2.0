
import styles from "./styles.module.scss";
import ProductCard from "../productCard";

export default function FeaturedProductsSection() {
  const products = [
    {
      id: 1,
      name: "SoundBlast Pro Wireless",
      price: 199.99,
      oldPrice: 249.99,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8Z6k5mI5l_m4Qi1CYXxWpig0R3PStiP6OsQ&s",
      rating: 4,
      isNew: true,
    },
    {
      id: 2,
      name: "ChronoTech Smartwatch",
      price: 159.99,
      oldPrice: 189.99,
      image: "https://m.media-amazon.com/images/I/71ykICDpB8L._AC_SY300_SX300_QL70_ML2_.jpg",
      rating: 5,
      isNew: false,
    },
    {
      id: 3,
      name: "Drone Vision Pro",
      price: 299.99,
      oldPrice: 349.99,
      image: "https://m.media-amazon.com/images/I/41zIa8NvQQL._AC_SY300_SX300_QL70_ML2_.jpg",
      rating: 4,
      isNew: false,
    },
  ];

  return (
    <section className={styles.featured}>
      <h2>Produtos em Destaque</h2>
      <div className={styles.grid}>
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
}
