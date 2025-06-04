import { Link } from 'react-router-dom';

import styles from './styles.module.css';

import dog_walking from '../../../img/dog_walking.png';
import dog_house from '../../../img/dog_house.png';
import heart_dog_paw from '../../../img/heart_dog_paw.png';
import tosa from '../../../img/tosa.png';
import arrow_back from '../../../img/arrow_back.svg';

export default function ServiceTypeSelection ({ onSelect }) {
    return (
      <div className={styles.selectionContainer}>
        <div className={`${styles.arrow_back} ${styles.fit_arrow}`}><Link to="/home_admin"><img src={arrow_back} alt="voltar para home"/></Link></div>
        <h2>Que tipo de serviço deseja cadastrar?</h2>
        
        <div className={styles.optionsGrid}>
          <div 
            className={styles.optionCard}
            onClick={() => onSelect('passeio')}
          >
            <img src={dog_walking} className={styles.servico} alt="Passeio" />
            <h3>Passeio</h3>
            <p>Passeio com pet ao ar livre</p>
          </div>
          
          <div 
            className={styles.optionCard}
            onClick={() => onSelect('hospedagem')}
          >
            <img src={dog_house} className={styles.servico} alt="Hospedagem" />
            <h3>Hospedagem</h3>
            <p>Hospedagem para diferentes animais de estimação</p>
          </div>

          <div 
            className={styles.optionCard}
            onClick={() => onSelect('consulta')}
          >
            <img src={heart_dog_paw} className={styles.servico} alt="Consulta" />
            <h3>Consulta Veterinária</h3>
            <p>Consultas como de rotina, queixa e emergência</p>
          </div>

        <div 
            className={styles.optionCard}
            onClick={() => onSelect('banho_tosa')}
          >
            <img src={tosa} className={styles.servico} alt="Banho e Tosa" />
            <h3>Banho & Tosa</h3>
            <p>Serviço de banho e Tosa</p>
          </div>
        </div>
      </div>
    );
  };