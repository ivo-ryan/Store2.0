import Link from "next/link";
import styles from "./styles.module.scss";

export default function HeaderNav (){
    return (
          <nav className={styles.navContainer}>
            <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/produtos">Produtos</Link></li>
                <li><Link href="/promocoes">Promoções</Link></li>
                <li><Link href="/contato">Contato</Link></li>
            </ul>
        </nav>
    )
}