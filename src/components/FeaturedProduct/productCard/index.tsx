
import styles from "./styles.module.scss";
import Image from "next/image";
import { FiShoppingCart, FiHeart } from "react-icons/fi";

interface ProductProps {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  rating: number;
  isNew?: boolean;
}

export default function ProductCard({
  name,
  price,
  oldPrice,
  image,
  rating,
  isNew,
}: ProductProps) {
  return (
    <div className={styles.card}>
      {isNew && <span className={styles.newTag}>NOVO</span>}
      <button className={styles.favorite}>
        <FiHeart />
      </button>

      <img src={image} alt={name} width={300} height={300} className={styles.imgCard} />

      <h3>{name}</h3>

      <div className={styles.rating}>
        {"★".repeat(rating)}
        {"☆".repeat(5 - rating)}
      </div>

      <div className={styles.price}>
        <span className={styles.current}>${price.toFixed(2)}</span>
        {oldPrice && <span className={styles.old}>${oldPrice.toFixed(2)}</span>}
      </div>

      <button className={styles.cartButton}>
        <FiShoppingCart />
        Adicionar ao Carrinho
      </button>
    </div>
  );
}
