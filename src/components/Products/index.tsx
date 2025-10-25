import { ProductType } from "@/services/productsServices";
import styles from "./styles.module.scss";
import ProductCard from "../productCard";

interface props {
    products: ProductType[]
}

export default function  Products ({ products }: props){

    const productsFilter = products.filter(p => !p.featured );
    
    return  (
        <section className={styles.sectionContainer}>

            <h2>Outros Produtos</h2>

            <div className={styles.grid}>
            {
                productsFilter.map(p => (
                    <ProductCard key={p.id} {...p}/>
                ))
            }

            </div>
        </section>
    )
}