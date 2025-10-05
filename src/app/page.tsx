
import Header from "@/components/header";
import styles from "./page.module.scss";
import CategoriesSection from "@/components/categories/categorySection";

export default function Home() {
  return (
    <div className={styles.page}>
        <Header/>
        <CategoriesSection/>
    </div>
  );
}
