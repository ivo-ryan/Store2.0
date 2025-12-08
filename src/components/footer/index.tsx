
import Link from "next/link";
import styles from "./styles.module.scss";
import { FiInstagram,FiSend, FiLinkedin } from "react-icons/fi";
import { FaTelegram, FaTelegramPlane, FaWhatsapp } from "react-icons/fa";

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
            <li><Link href="/#produtos">Produtos</Link></li>
            <li><Link href="/#promocoes">Promoções</Link></li>
            <li><Link href="/#contato">Contato</Link></li>
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
            <Link href="https://www.instagram.com/ivoryan.01" target="_blank">
              <FiInstagram />
            </Link>
            <Link href="https://wa.me/5563992644269?text=OI%C3%A1%20Ryan%20,%20acabei%20vendo%20seu%20perfil%20no%20github%20e%20queria%20conversar!" target="_blank">
              <FaWhatsapp />
            </Link>
            <Link href="https://t.me/ivo_ryan" target="_blank">
             <FaTelegramPlane />
            </Link>            
            <Link href="https://www.linkedin.com/in/ivo-bastos-a0a8262a7/" target="_blank">
              <FiLinkedin />
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.copy}>
        <p>© {new Date().getFullYear()} StreamLy. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
