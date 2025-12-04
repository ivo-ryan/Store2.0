
import Link from "next/link";
import styles from "./styles.module.scss";
import { FiInstagram, FiFacebook, FiTwitter, FiYoutube, FiSend } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.column}>
          <h3>StreamLy</h3>
          <p>
            Tecnologia, som e inovação.  
            Explore o futuro com a StreamLy.
          </p>
        </div>

        <div className={styles.column}>
          <h4>Links Rápidos</h4>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/produtos">Produtos</Link></li>
            <li><Link href="/promocoes">Promoções</Link></li>
            <li><Link href="/contato">Contato</Link></li>
          </ul>
        </div>

        <div className={styles.column}>
          <h4>Suporte</h4>
          <ul>
            <li><a href="#">Ajuda</a></li>
            <li><a href="#">Política de Privacidade</a></li>
            <li><a href="#">Termos de Uso</a></li>
          </ul>
        </div>

        <div className={styles.column}>
          <h4>Newsletter</h4>
          <p>Receba novidades e promoções exclusivas.</p>
          <div className={styles.newsletter}>
            <input type="email" placeholder="Seu e-mail" />
            <button>
              <FiSend />
            </button>
          </div>

          <div className={styles.socials}>
            <FiInstagram />
            <FiFacebook />
            <FiTwitter />
            <FiYoutube />
          </div>
        </div>
      </div>

      <div className={styles.copy}>
        <p>© {new Date().getFullYear()} StreamLy. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
