
import styles from "./styles.module.scss";

interface Props {
  name: string;
  image: string;
}

export default function CategoryCard({ name, image }: Props) {
  return (
    <div className={styles.card}>
      <img src={image} alt={name}  />
      <div className={styles.overlay}>
        <h3>{name}</h3>
        <button>Ver Mais</button>
      </div>
    </div>
  );
}
