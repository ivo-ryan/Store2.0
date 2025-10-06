
import Header from "@/components/header";
import styles from "./page.module.scss";
import CategoriesSection from "@/components/categories/categorySection";
import FeaturedProductsSection from "@/components/FeaturedProduct/featuredProductSection";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className={styles.page}>
        <Header/>
        <CategoriesSection/>
        <FeaturedProductsSection/>
        <Footer/>
    </div>
  );
}
