import Carousel from 'react-bootstrap/Carousel';

import { Link } from 'react-router-dom';

import { useEffect, useState } from 'react';

import styles from './Home.module.css';

import arbusto_verde_musgo from '../img/arbusto verde musgo.png';
import arbusto_verde from '../img/arbusto verde.png';
import dog from '../img/dog.png';
import racao from '../img/ração metade.png';

import oferta_tosa from '../img/Oferta de pacote de tosa.png';
import anuncio_vacinacao from '../img/Anúncio vacinação.png';
import arrow from '../img/arrow.png';

import banner_conheca from '../img/banner_conheca_our.png';

function Home() {
  const [userType, setUserType] = useState('');

  useEffect(() => {
    const tipo = localStorage.getItem('userType');
    setUserType(tipo);
  }, []);

  return (
    <section className={styles.home_container}>
      <div className={styles.principal}>
          <div className={styles.imagens}>
            <img className={styles.arbusto_verde} src={arbusto_verde}/>
              <img className={styles.dog}  src={dog}/>
              <img className={styles.arbusto_verde_musgo} src={arbusto_verde_musgo}/>
              <img className={styles.racao} src={racao}/>
            </div>
            <div className={styles.prim_part}>
            <h1>Comida para Pet</h1>
              <p>Aqui temos comida para pet e muito mais!</p>
              <a className={styles.button_buscar} href="/">Buscar Produtos</a>
            </div>
          </div>
          <div className={styles.cont_carousel}>
            <Carousel 
              data-bs-theme="dark"
              prevIcon={<img className={styles.arrow_back} src={arrow} alt="Voltar" />}
              nextIcon={<img className={styles.arrow_skip} src={arrow} alt="Avançar" />}
            >
              <Carousel.Item>
                <img className="d-block w-100" src={oferta_tosa} alt="Oferta de Tosa" />
              </Carousel.Item>
              <Carousel.Item>
                <img className="d-block w-100" src={anuncio_vacinacao} alt="Anúncio de Vacinação" />
              </Carousel.Item>
            </Carousel>
          </div>
          <div className={styles.banner}>
            <img src={banner_conheca} />
            <Link className={styles.button_peca} to="/servicos">Peça agora</Link>
      </div>
    </section>
  );
}

export default Home;