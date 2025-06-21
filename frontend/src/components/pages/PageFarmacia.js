import { useEffect, useState } from 'react';
import styles from './PageAcessorios.module.css';

function PageAcessorios() {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/produtos/lista')
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao carregar produtos");
        return res.json();
      })
      .then((data) => {
        setProdutos(data);
        setCarregando(false);
      })
      .catch((error) => {
        console.error('Erro ao buscar produtos:', error);
        setErro(error.message);
        setCarregando(false);
      });
  }, []);

  if (carregando) return <p className={styles.loading}>Carregando produtos...</p>;
  if (erro) return <p className={styles.erro}>Erro: {erro}</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.titulo}>Todos os Produtos</h1>
      <div className={styles.grid}>
        {produtos.map((produto) => (
          <div className={styles.card} key={produto.produto_id}>
            <img
              src={produto.produto_imagem || '/img/default.png'}
              alt={produto.produto_nome}
              className={styles.imagem}
            />
            <h2 className={styles.nome}>{produto.produto_nome}</h2>
            <p className={styles.avaliacao}>⭐ {produto.avaliacao || '4.5'}</p>
            <p className={styles.preco}>R$ {parseFloat(produto.produto_preco).toFixed(2)}</p>
            <button className={styles.botao}>Adicionar ao carrinho</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PageAcessorios;
