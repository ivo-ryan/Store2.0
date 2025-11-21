
import styles from "./styles.module.scss";
import Cart from "@/components/cartComponent";
import Footer from "@/components/footer";
import HeaderNav from "@/components/header/headerNav";
import HeaderTop from "@/components/header/headerTop";

export default function Page (){
    return (
        <>
            <HeaderTop search={false} />
             <div className={styles.containerHeader}>
                <div>
                    <HeaderNav/>
                </div>
            </div>
            <Cart/>
            <Footer/>
        </>
    )
}