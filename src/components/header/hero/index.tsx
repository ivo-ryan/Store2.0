"use client"

import styles from "./styles.module.scss";
import { SwiperSlide , Swiper} from "swiper/react";
import "swiper/css";import { Autoplay } from "swiper/modules";
;

export default function Hero() {

  const imghero = [
    { 
      id: 1,
      name: "Zona Gamer",
      description: "Seu Próximo Nível Começa Aqui: Hardware e Conforto Inigualáveis.",
      img: "/tecnologia.png",
      imgMobile: "/tecnologia-mobile.png"
     },

     {
      id: 2,
      name: "Street Style",
      description: "Destaque-se: Elegância e Modernidade em Cada Detalhe.",
      img: "/moda.png",
      imgMobile: "/moda-mobile.png"
     },

     {
      id: 3,
      name: "Treino Hard",
      description: "Seu Corpo, Sua Meta: A Nutrição que Você Precisa para ir Além.",
      img: "/fitness.png",
      imgMobile: "/fitness-mobile.png"
     }
  ]

  return (
    <div className={styles.hero}>
      <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 3000, 
            disableOnInteraction: false,  
          }}
          loop={true} 
          slidesPerView={1}
      >
        {
          imghero.map(i => (
             <SwiperSlide key={i.id}>
              <div className={styles.content} >
                <h1>{i.name}</h1>
                <p>{i.description}</p>
                </div>

                <div className={styles.imageWrapper}>
                <img src={i.img} alt={i.name} className={styles.img}/>
                <img src={i.imgMobile} alt={i.name} className={styles.imgMobile}/>                
              </div>
             </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  );
}
