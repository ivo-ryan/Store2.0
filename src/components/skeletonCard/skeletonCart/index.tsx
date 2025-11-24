import styles from "./styles.module.scss";

export default function CartSkeleton() {
  return (
    <div className={styles.skeletonContainer}>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className={styles.skeletonItem}>
          <div className={styles.skeletonImage}></div>

          <div className={styles.skeletonInfo}>
            <div className={styles.skeletonTitle}></div>
            <div className={styles.skeletonSub}></div>

            <div className={styles.skeletonPrice}></div>

            <div className={styles.skeletonQtd}></div>
          </div>
        </div>
      ))}
    </div>
  );
}
