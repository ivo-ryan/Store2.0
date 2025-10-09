
import styles from "./styles.module.scss";
import Hero from "../hero";
import HeaderNav from "../headerNav";

export default function HeaderSection() {
  return (
    <section className={styles.sectionContainer}>      
        <HeaderNav/>
        <Hero/>
    </section>
  );
}
