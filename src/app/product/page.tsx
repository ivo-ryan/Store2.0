
import HeaderNav from "@/components/header/headerNav";
import HeaderTop from "@/components/header/headerTop";
import SingleProduct from "@/components/singleProduct";
import styles from "./styles.module.scss";
import Footer from "@/components/footer";

export default function Page (){


    return (
        <>
            <HeaderTop/>
            <div className={styles.containerHeader}>
                <div>
                    <HeaderNav/>
                </div>
            </div>
            <SingleProduct/>
            <Footer/>
        </>
    )
}