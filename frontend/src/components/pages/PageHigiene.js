import styles from './PageHigiene.module.css';

import higi1 from '../img/higi1.png';
import higi2 from '../img/higi2.png';
import higi3 from '../img/higi3.png';
import higi4 from '../img/higi4.png';
import higi5 from '../img/higi5.png';
import higi6 from '../img/higi6.png';
import higi7 from '../img/higi7.png';

const higieneMock = [
  {
    id: 1,
    nome: "PipiCats - areia gatos",
    preco: "28,90",
    avaliacao: 4.5,
    imagem: higi1,
  },
  {
    id: 2,
    nome: "Areia MyCat",
    preco: "33,50",
    avaliacao: 4.6,
    imagem: higi2,
  },
  {
    id: 3,
    nome: "Areia Viva",
    preco: "19,99",
    avaliacao: 4.7,
    imagem: higi3,
  },
  {
    id: 4,
    nome: "Petisco Escova Gatíssimo",
    preco: "14,00",
    avaliacao: 4.3,
    imagem: higi4,
  },
  {
    id: 5,
    nome: "KatBom areia higiênica",
    preco: "24,90",
    avaliacao: 4.4,
    imagem: higi5,
  },
  {
    id: 6,
    nome: "Desinfetante em silica",
    preco: "36,00",
    avaliacao: 4.6,
    imagem: higi6,
  },
  {
    id: 7,
    nome: "Areia pink cat",
    preco: "29,50",
    avaliacao: 4.2,
    imagem: higi7,
  },
];

function PageHigiene() {
  return (
    <div className={styles.container}>
      <h1 className={styles.titulo}>Produtos de Higiene</h1>
      <div className={styles.grid}>
        {higieneMock.map((produto) => (
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

export default PageHigiene;
