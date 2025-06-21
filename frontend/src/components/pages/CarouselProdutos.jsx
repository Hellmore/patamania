import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import styles from './CarouselProdutos.module.css';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 600 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 1,
  },
};

function CarouselProdutos({ produtos }) {
  return (
    <Carousel
      responsive={responsive}
      infinite
      autoPlay
      autoPlaySpeed={3000}
      itemClass={styles.carouselItem} // Adiciona classe para espaçamento
    >
      {produtos.map((produto) => (
        <div key={produto.id} className={styles.card}>
          <img src={produto.imagem} alt={produto.nome} className={styles.imagem} />
          <h3 className={styles.nome}>{produto.nome}</h3>
          <p className={styles.preco}>R$ {produto.preco}</p>
        </div>
      ))}
    </Carousel>
  );
}

export default CarouselProdutos;
