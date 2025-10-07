
import Header from "@/components/header";
import styles from "./page.module.scss";
import CategoriesSection from "@/components/categories/categorySection";
import FeaturedProductsSection from "@/components/FeaturedProduct/featuredProductSection";
import Footer from "@/components/footer";
import { productsService } from "@/services/productsServices";

export default async function Home() {

  const products = await productsService.getNewest();

  return (
    <div className={styles.page}>
        <Header/>
        <CategoriesSection/>
        <FeaturedProductsSection products={products.data} />
        <Footer/>
    </div>
  );
}
