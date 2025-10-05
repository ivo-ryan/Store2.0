
import styles from "./styles.module.scss";
import Link from "next/link";
import Hero from "../hero";

export default function HeaderSection() {
  return (
    <section className={styles.sectionContainer}>
        <nav className={styles.headerSection}>
            <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/produtos">Produtos</Link></li>
                <li><Link href="/promocoes">Promoções</Link></li>
                <li><Link href="/contato">Contato</Link></li>
            </ul>
        </nav>

        <Hero/>

    </section>
  );
}
