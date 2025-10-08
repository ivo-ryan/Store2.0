"use client"


import styles from "./styles.module.scss";
import ProductCard from "../productCard";
import { ProductType } from "@/services/productsServices";
import { SwiperSlide , Swiper} from "swiper/react";
import "swiper/css";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface props {
  products: ProductType[]
}

export default function FeaturedProductsSection({products}: props) {


  return (
    <section className={styles.featured}>
      <h2>Produtos em Destaque</h2>

      <Swiper       
        modules={[Navigation, Pagination]}
        slidesPerView={4} 
        spaceBetween={20} 
        loop  
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        >
            {products.map((product) => (
              <SwiperSlide key={product.id} className={styles.swiperSlide}>
                <ProductCard  {...product} />
              </SwiperSlide>
            ))}
      </Swiper>

    </section>
  );
}
