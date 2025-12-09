import styles from "./styles.module.scss";

export default function SkeletonCard () {
    return (
        <div className={styles.skeletonCard} data-testid="skeleton-card" >
            <div className={styles.img}></div>
            <div className={styles.title}></div>
            <div className={styles.subtitle}></div>
        </div>

    )
}