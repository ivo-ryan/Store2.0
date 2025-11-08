
import Footer from "@/components/footer";
import HeaderNav from "@/components/header/headerNav";
import HeaderTop from "@/components/header/headerTop";
import SearchProduct from "@/components/searchProducts";
import styles from "./styles.module.scss";

export default function Page() {
    return (
        <>
            <HeaderTop />
            <div className={styles.containerHeader}>
             <div>
                 <HeaderNav/>
             </div>
            </div>

            <SearchProduct/>

            <Footer/>
        </>
    )
}