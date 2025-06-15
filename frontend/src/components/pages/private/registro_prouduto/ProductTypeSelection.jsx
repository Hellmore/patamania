import { Link } from 'react-router-dom';

import styles from './styles.module.css';

import coleira from '../../../img/coleira.png';
import cookie from '../../../img/cookie.png';
import arrow_back from '../../../img/arrow_back.svg';

export default function ProductTypeSelection ({ onSelect }) {
    return (
      <div className={styles.selectionContainer}>
        <div className={`${styles.arrow_back} ${styles.fit_arrow}`}><Link to="/home_admin"><img src={arrow_back} alt="voltar para home"/></Link></div>
        <h2>Que tipo de produto deseja cadastrar?</h2>
        
        <div className={styles.optionsGrid}>
          <div 
            className={styles.optionCard}
            onClick={() => onSelect('NAO PERECIVEL')}
          >
            <img src={coleira} className={styles.produto} alt="Produto não perecível" />
            <h3>Produto não perecível</h3>
            <p>Itens como coleiras, brinquedos, etc.</p>
          </div>
          
          <div 
            className={styles.optionCard}
            onClick={() => onSelect('PERECIVEL')}
          >
            <img src={cookie} className={styles.produto} alt="Alimento" />
            <h3>Alimento</h3>
            <p>Produtos alimentícios em geral</p>
          </div>
        </div>
      </div>
    );
  };