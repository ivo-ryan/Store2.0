
import styles from "./styles.module.scss";
import ProductCard from "../productCard";
import { ProductType } from "@/services/productsServices";

interface props {
  products: ProductType[]
}

export default function FeaturedProductsSection({products}: props) {


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
