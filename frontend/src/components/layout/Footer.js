import {FaFacebook, FaInstagram} from 'react-icons/fa';
import { FaSquareXTwitter } from "react-icons/fa6";
import { AiFillTikTok } from "react-icons/ai"; 

import logo_patamania from '../img/Logo Patamania + nome.png';
import visa from '../img/visa.png';
import pagSeguro from '../img/pagseguro.png';
import americanExpress from '../img/american express.png';
import pix from '../img/pix.png';
import elo from '../img/elo.png';
import paypal from '../img/paypal.png';
import boleto from '../img/boleto.png';

import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_header}>
        <div className={styles.logo}>
            <img className={styles.patamania} src={logo_patamania} alt="Logo Patamania" />
        </div>
        <div className={styles.rede_sociais}>
          <p className={styles.title}>Siga-nos</p>
          <ul className={styles.social_list}>
            <li><FaSquareXTwitter /></li>
            <li><AiFillTikTok /></li>
            <li><FaInstagram /></li>
            <li><FaFacebook /></li>
          </ul>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.title}>
          <p>Termos e Condição</p>
          <ul>Política de privacidade</ul>
          <ul>Política de Trocas e Devoluções</ul>
        </div>
          <div className={styles.title}>
            <p>Sobre a Patamania</p>
            <ul>Sobre nós</ul>
            <ul>Perguntas Frequente (FAQ)</ul>
          </div>
          <div className={styles.title}>
            <p>Produtos</p>
            <ul>Acessórios</ul>
            <ul>Alimentos</ul>
            <ul>Higiene</ul>
            <ul>Medicamentos</ul>
            <ul>Farmácia Pet</ul>
          </div>
          <div className={styles.title}>
            <p>Serviços</p>
            <ul>Banho e Tosa</ul>
            <ul>Consultas Veterinárias</ul>
            <ul>Passeios</ul>
            <ul>Hospedagens</ul>
          </div>
          <div className={styles.title}>
            <p>Contatos</p>
            <ul>Telefone: +55 (00)00000-0000</ul>
            <ul>E-mail: patamania@mania.com</ul>
          </div>
          <div className={styles.title}>
            <p>Endereço</p>
            <ul>CEP: 13082-015 - Campinas - SP - Brasil</ul>
            <ul>CNPJ: 00.000.000/0000-01</ul>
          </div>
      </div>      
      <hr />
      <p className={styles.ppagamento}>Pagamentos</p>
      <ul className={styles.pagamento}>
        <li><img src={visa} alt="Visa" /></li>
        <li><img src={pagSeguro} alt="PagSeguro" /></li>
        <li><img src={elo} alt="Elo" /></li>
        <li><img src={americanExpress} alt="American Express" /></li>
        <li><img src={pix} alt="PIX" /></li>
        <li><img src={paypal} alt="PayPal" /></li>
        <li><img src={boleto} alt="Boleto" /></li>
      </ul>


      <p className={styles.copy_right}>&copy; 2025, <span>Patamania</span></p>
    </footer>
  )
}

export default Footer