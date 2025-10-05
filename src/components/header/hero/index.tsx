
import styles from "./styles.module.scss";
import Image from "next/image";
import exemple from "../../../../public/exemple.png"

export default function Hero() {
  return (
    <div className={styles.hero}>
      <div className={styles.content}>
        <h1>O FUTURO DO SOM. AGORA</h1>
        <p>Experimente a próxima geração de áudio.</p>
        <button>Descobrir Produtos</button>
      </div>

      <div className={styles.imageWrapper}>
        <Image src={exemple} alt="Headphone" priority />
      </div>
    </div>
  );
}
