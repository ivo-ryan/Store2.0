import styles from "./styles.module.scss";

export default function Loading(){
    return(
        <div className={styles.loading}>
            <img src="/loading.gif" alt="loading..." />
        </div>
    )
}