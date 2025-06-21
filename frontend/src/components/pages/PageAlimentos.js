import styles from './PageAlimentos.module.css';

import img11 from '../img/1.1.png';
import img22 from '../img/1.2.png';
import img33 from '../img/1.3.png';
import img44 from '../img/1.4.png';
import img55 from '../img/1.5.png';
import img66 from '../img/1.6.png';
import img77 from '../img/1.7.png';




const alimentosMock = [
  {
    id: 1,
    nome: "Ração Seca Premium Cães Adulto",
    preco: "129,90",
    avaliacao: 4.7,
    imagem: img11,
  },
  {
    id: 2,
    nome: "Ração Úmida Sachê Gatos Adultos",
    preco: "5,99",
    avaliacao: 4.5,
    imagem: img22,
  },
  {
    id: 3,
    nome: "Ração Golden Fórmula Cães Filhotes",
    preco: "169,90",
    avaliacao: 4.8,
    imagem: img33,
  },
  {
    id: 4,
    nome: "Ração Nattu",
    preco: "12,50",
    avaliacao: 4.6,
    imagem: img44,
  },
  {
    id: 5,
    nome: "Ração Especial Raças Pequenas",
    preco: "84,90",
    avaliacao: 4.9,
    imagem: img55,
  },
  {
    id: 6,
    nome: "Snack Natural Cães",
    preco: "18,99",
    avaliacao: 4.3,
    imagem: img66,
  },
  {
    id: 7,
    nome: "Ração Gatos Castrados Light",
    preco: "109,90",
    avaliacao: 4.7,
    imagem: img77,
  },

];

function PageAlimentos() {
  return (
    <div className={styles.container}>
      <h1 className={styles.titulo}>Alimentos para Pets</h1>
      <div className={styles.grid}>
        {alimentosMock.map((produto) => (
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

export default PageAlimentos;
