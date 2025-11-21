

import HeaderTop from "@/components/header/headerTop";
import styles from "./styles.module.scss";
import Footer from "@/components/footer";
import OrderList from "@/components/ordersComponents/orderList";
import HeaderNav from "@/components/header/headerNav";

export default function Page() {
    return (
        <>
            <HeaderTop search={false} />
            <div className={styles.containerHeader}>
                <div>
                    <HeaderNav />
                </div>
            </div>
            <OrderList/>
            <Footer/>
        </>
    )
}