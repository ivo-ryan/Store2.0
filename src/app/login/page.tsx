import Footer from "@/components/footer";
import HeaderTop from "@/components/header/headerTop";
import LoginPage from "@/components/loginForm";
import styles from "./styles.module.scss";
import HeaderNav from "@/components/header/headerNav";

export default function Page () {
  return (
    <>
      <HeaderTop search={false} />

      <div className={styles.containerHeader}>
          <div>
            <HeaderNav/>
          </div>
      </div>

      <LoginPage/>

      <Footer/>
    </>
  )
}