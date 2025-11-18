

import HeaderTop from "@/components/header/headerTop";
import styles from "./styles.module.scss";
import Footer from "@/components/footer";
import OrderList from "@/components/ordersComponents/orderList";

export default function Page() {
    return (
        <>
            <HeaderTop search={false} />
            <OrderList/>
            <Footer/>
        </>
    )
}