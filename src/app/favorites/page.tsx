
import FavoritesProducts from "@/components/favoritesProducts";
import styles from "./styles.module.scss"
import HeaderNav from "@/components/header/headerNav";
import HeaderTop from "@/components/header/headerTop";
import Footer from "@/components/footer";

export default function Page()  {
    return (
        <>
            <HeaderTop/>
            
            <div className={styles.containerHeader}>
                <div>
                    <HeaderNav/>
                </div>
            </div>

            <FavoritesProducts/>

            <Footer/>
            
        </>
    )
}