"use client"

import { Swiper, SwiperSlide } from "swiper/react";
import useProduct from "../customComponents/useProduct";
import HeaderNav from "../header/headerNav";
import styles from "./styles.module.scss";
import "swiper/css";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FiShoppingCart } from "react-icons/fi";
import FeatureProduct from "./featureProduct";
import CategoryProducts from "../categories/categoryProducts";
import FavoriteProduct from "../favoriteProduct";


export default function SingleProduct() {

    const { loading, product } = useProduct();

    if (loading || !product[0]) return <p>Carregando...</p>;

    const idProduct = String(product[0].id);

    return (
        <section className={styles.sectionContainer}>

            <div className={styles.slideProduct}>
                
                <div className={styles.product}>
                    <Swiper 
                        slidesPerView={1}
                        loop
                        modules={[Navigation, Pagination]}
                        navigation
                        pagination={{clickable:true}}
                        centeredSlides={true}
                    >
                    {
                        product[0].images.map(i => (
                            <SwiperSlide key={i.id}>
                                <img src={i.url} alt={i.altText} />
                            </SwiperSlide>
                        ))
                    }
                    </Swiper>
                </div>

                <div className={styles.info}>
                    {product[0].isNew && <span className={styles.newTag}>Novo</span>}

                    <div className={styles.favorite}>
                        <FavoriteProduct id={idProduct} />
                    </div>


                    <h2>{product[0].name}</h2>

                    <div className={styles.rating}>
                    {"★".repeat(product[0].rating)}
                    {"☆".repeat(5 - product[0].rating)}
                    </div>

                     <div className={styles.price}>
                        <span className={styles.current}>R$ {Number(product[0].price).toFixed(2)}</span>
                        {product[0].oldPrice && <span className={styles.old}>R$ {Number(product[0].oldPrice).toFixed(2)}</span>}
                    </div>

                   <div className={styles.containerButton}>
                      <button className={styles.cartButton}>
                        <FiShoppingCart />
                        Adicionar ao Carrinho
                    </button>
                     <button className={styles.cartButton}>
                        <FiShoppingCart />
                        Comprar Agora
                    </button>
                   </div>
                </div>
            </div>

            <div className={styles.container}>
                <FeatureProduct descricao={product[0].description}  especificacoes={product[0].mark}/>
            </div>

            <h2>Produtos Relacionados:</h2>

            <CategoryProducts productId={product[0].id}/>


        </section>
    )
}