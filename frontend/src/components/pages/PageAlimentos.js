import { useEffect, useState } from 'react';
import styles from './PageAcessorios.module.css';
import { useAuth } from "../../context/AuthContext";

function PageAcessorios() {
  const [produtos, setProdutos] = useState([]);
  const { user } = useAuth();
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  // Lista dos nomes de produtos que você quer exibir
  const nomesFiltrados = [
    "Ração Premium",
    "Ração Golden Premium para Gatos",
    "Ração Premium para Gatos Atualizada",
    "Ração Premium para Gatos"
  ];

  useEffect(() => {
    fetch('http://localhost:3001/produtos/lista')
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao carregar produtos");
        return res.json();
      })
      .then((data) => {
        const produtosFiltrados = data.filter(produto =>
          nomesFiltrados.includes(produto.produto_nome)
        );
        setProdutos(produtosFiltrados);
        setCarregando(false);
      })
      .catch((error) => {
        console.error('Erro ao buscar produtos:', error);
        setErro(error.message);
        setCarregando(false);
      });
  }, []);

  const handleAdicionarAoCarrinho = async (produto) => {
    try {
      const usuario_id = user?.id;
      if (!usuario_id) {
        alert("Você precisa estar logado para adicionar ao carrinho.");
        return;
      }

      // Verifica se já existe um carrinho
      const resCarrinhos = await fetch("http://localhost:3001/carrinho/lista");
      const carrinhos = await resCarrinhos.json();
      let carrinho = carrinhos.find(c => c.usuario_id === usuario_id);

      if (!carrinho) {
        const novaData = new Date().toISOString().split('T')[0];
        const novoId = Math.floor(Math.random() * 1000000);

        const res = await fetch("http://localhost:3001/carrinho/cadastro", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            carrinho_id: novoId,
            usuario_id,
            carrinho_data_criacao: novaData
          })
        });

        if (!res.ok) throw new Error("Erro ao criar carrinho");
        carrinho = { carrinho_id: novoId };
      }

      await fetch("http://localhost:3001/item_carrinho/cadastro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          carrinho_id: carrinho.carrinho_id,
          produto_id: produto.produto_id,
          item_quantidade: 1,
          item_preco_unitario: produto.produto_preco
        })
      });

      alert("Produto adicionado ao carrinho!");
    } catch (err) {
      console.error("Erro ao adicionar item:", err);
      alert("Erro ao adicionar item ao carrinho.");
    }
  };

  if (carregando) return <p className={styles.loading}>Carregando produtos...</p>;
  if (erro) return <p className={styles.erro}>Erro: {erro}</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.titulo}>Produtos Selecionados</h1>
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
            <button
              className={styles.botao}
              onClick={() => handleAdicionarAoCarrinho(produto)}
            >
              Adicionar ao carrinho
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PageAcessorios;
