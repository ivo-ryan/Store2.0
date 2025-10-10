"use client"

import { Swiper, SwiperSlide } from "swiper/react";
import useProduct from "../customComponents/useProduct";
import HeaderNav from "../header/headerNav";
import styles from "./styles.module.scss";
import "swiper/css";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import FeatureProduct from "./featureProduct";
import CategoryProducts from "../categories/categoryProducts";



export default function SingleProduct() {
    const { loading, product } = useProduct();
    

    if(loading) return <p>Carregando...</p>

    return (
        <section className={styles.sectionContainer}>
            <div className={styles.container}>
                <div>
                <HeaderNav/>
                </div>
            </div>
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

                    <button className={styles.favorite}>
                        <FiHeart />
                    </button>

                    <h2>{product[0].name}</h2>

                    <div className={styles.rating}>
                    {"★".repeat(product[0].rating)}
                    {"☆".repeat(5 - product[0].rating)}
                    </div>

                    <div className={styles.price}>
                        <span className={styles.current}>R$ {product[0].price}</span>
                        {product[0].oldPrice && <span className={styles.old}>R$ {product[0].oldPrice} </span>}
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

            <FeatureProduct descricao={product[0].description}  especificacoes={product[0].mark}/>

            <h2>Produtos Relacionados:</h2>

            <CategoryProducts/>


        </section>
    )
}