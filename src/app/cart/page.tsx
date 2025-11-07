
import styles from "./styles.module.scss";
import Cart from "@/components/cartComponent";
import HeaderTop from "@/components/header/headerTop";

export default function Page (){
    return (
        <>
            <HeaderTop search={false} />
            <Cart/>
        </>
    )
}