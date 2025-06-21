import styles from './PageFarmacia.module.css';

import remedio1 from '../img/remedio1.png';
import remedio2 from '../img/remedio2.png';
import remedio3 from '../img/remedio3.png';
import remedio4 from '../img/remedio4.png';
import remedio5 from '../img/remedio5.png';
import remedio6 from '../img/remedio6.png';

const farmaciaMock = [
  {
    id: 1,
    nome: "Vermífugo Canex",
    preco: "29,90",
    avaliacao: 4.6,
    imagem: remedio1,
  },
  {
    id: 2,
    nome: "Antibiótico PetClav",
    preco: "56,00",
    avaliacao: 4.7,
    imagem: remedio2,
  },
  {
    id: 3,
    nome: "Suplemento Vitamínico Petfer",
    preco: "32,50",
    avaliacao: 4.5,
    imagem: remedio3,
  },
  {
    id: 4,
    nome: "Pomada Dermatológica PetDerma",
    preco: "18,99",
    avaliacao: 4.4,
    imagem: remedio4,
  },
  {
    id: 5,
    nome: "Antipulgas NexGard",
    preco: "89,90",
    avaliacao: 4.9,
    imagem: remedio5,
  },
  {
    id: 6,
    nome: "Colírio Oftálmico Vetolac",
    preco: "45,00",
    avaliacao: 4.6,
    imagem: remedio6,
  },

];

function PageFarmacia() {
  return (
    <div className={styles.container}>
      <h1 className={styles.titulo}>Medicamentos e Itens de Farmácia</h1>
      <div className={styles.grid}>
        {farmaciaMock.map((produto) => (
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

export default PageFarmacia;
