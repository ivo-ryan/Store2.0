import Link from "next/link";
import styles from "./styles.module.scss";
import { FaArrowLeft } from "react-icons/fa";

export default function HeaderCart (){
    return(
        <>
            <div className={styles.header}>
                <Link href="/"><FaArrowLeft/></Link>
                <h2>Seu Carrinho</h2>
            </div>
        </>
    )
}