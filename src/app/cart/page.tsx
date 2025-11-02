import HeaderCart from "@/components/cartComponent/headerCart";
import styles from "./styles.module.scss";
import CartProducts from "@/components/cartComponent/cartProduct";

export default function Page (){
    return (
        <>
            <HeaderCart/>
            <CartProducts/>
        </>
    )
}