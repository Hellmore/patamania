import styles from './PageAcessorios.module.css';

import img1 from '../img/1.png';
import img2 from '../img/2.png';
import img3 from '../img/3.png';
import img4 from '../img/4.png';
import img5 from '../img/5.png';
import img6 from '../img/6.png';
import img7 from '../img/7.png';
import img8 from '../img/8.png';
import img9 from '../img/9.png';
import img10 from '../img/dog.png'; // exemplo para o 10º produto

const produtosMock = [
  {
    id: 1,
    nome: "Bolsa Portátil Cães",
    preco: "318,87",
    avaliacao: 4.8,
    imagem: img1,
  },
  {
    id: 2,
    nome: "Granado - Shampoo PET Desembaraçador",
    preco: "44,90",
    avaliacao: 4.7,
    imagem: img2,
  },
  {
    id: 3,
    nome: "Granado - Condicionador PET Neutro",
    preco: "56,00",
    avaliacao: 4.8,
    imagem: img3,
  },
  {
    id: 4,
    nome: "Petisco Premier Pet Cookie de Frutas",
    preco: "16,40",
    avaliacao: 4.0,
    imagem: img4,
  },
  {
    id: 5,
    nome: "Guia FLEXI New Classic Corda M - Preto",
    preco: "146,04",
    avaliacao: 4.9,
    imagem: img5,
  },
  {
    id: 6,
    nome: "Caminha Pet Confort Luxo Tam M",
    preco: "199,99",
    avaliacao: 4.6,
    imagem: img6,
  },
  {
    id: 7,
    nome: "Brinquedo Mordedor de Borracha PetFun",
    preco: "22,90",
    avaliacao: 4.5,
    imagem: img7,
  },
  {
    id: 8,
    nome: "Coleira Estampada Ajustável",
    preco: "35,00",
    avaliacao: 4.3,
    imagem: img8,
  },
  {
    id: 9,
    nome: "Tapete Higiênico Ultra Seco c/ 30 un",
    preco: "89,90",
    avaliacao: 4.7,
    imagem: img9,
  },
  {
    id: 10,
    nome: "Shampoo Antipulgas para Cães 500ml",
    preco: "32,50",
    avaliacao: 4.4,
    imagem: img10,
  },
];

function PageAcessorios() {
  return (
    <div className={styles.container}>
      <h1 className={styles.titulo}>Todos os Produtos</h1>
      <div className={styles.grid}>
        {produtosMock.map((produto) => (
          <div className={styles.card} key={produto.id}>
            <img src={produto.imagem} alt={produto.nome} className={styles.imagem} />
            <h2 className={styles.nome}>{produto.nome}</h2>
            <p className={styles.avaliacao}>⭐ {produto.avaliacao}</p>
            <p className={styles.preco}>R${produto.preco}</p>
            <button className={styles.botao}>Adicionar ao carrinho</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PageAcessorios;
