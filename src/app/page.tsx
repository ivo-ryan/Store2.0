
import Header from "@/components/header";
import styles from "./page.module.scss";
import CategoriesSection from "@/components/categories/categorySection";
import FeaturedProductsSection from "@/components/FeaturedProduct";
import Footer from "@/components/footer";
import { productsService } from "@/services/productsServices";
import Products from "@/components/Products";

export default async function Home() {

  const newestProducts = await productsService.getNewest();
  const products = await productsService.getAll();

  return (
    <div className={styles.page}>
        <Header/>
        <CategoriesSection/>
        <FeaturedProductsSection products={newestProducts.data} />
        <Products products={products.data.data} />
        <Footer/>
    </div>
  );
}
