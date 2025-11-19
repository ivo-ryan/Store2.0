import styles from "./styles.module.scss";

type StatusProps = {
    status: "PAID" | "PENDING" | "CANCELED"
}

export default function OrderStatusBadge({ status }: StatusProps) {
  const map = {
    PAID: "Pago",
    PENDING: "Pendente",
    CANCELED: "Cancelado"
  };

  return (
    <p className={`${styles.badge} ${styles[status.toLowerCase()]}`}>
      {map[status]}

      <span className={`
                ${
                   map[status] === "Pendente" && styles.pending                    
                }

                ${
                   map[status] === "Pago" && styles.statusPaid
                }

                ${
                   map[status] === "Cancelado" && styles.canceled
                }
            `}></span>
    </p>
  );
}
