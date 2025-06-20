import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function PageCarrinho() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [itens, setItens] = useState([]);
  const [quantidadesTemp, setQuantidadesTemp] = useState({});
  const [selecionados, setSelecionados] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    if (!user) return;

    async function fetchItens() {
      try {
        const response = await axios.get(`/item_carrinho/usuario/${user.id}`);
        console.log("Usuário logado:", user);
        setItens(response.data);

        const quantidadesIniciais = {};
        response.data.forEach(item => {
          quantidadesIniciais[item.item_id] = item.item_quantidade;
        });
        setQuantidadesTemp(quantidadesIniciais);

        setLoading(false);
      } catch (error) {
        setErro('Erro ao carregar itens do carrinho');
        setLoading(false);
      }
    }

    fetchItens();
  }, [user]);

  const toggleSelecionado = (item_id) => {
    const newSet = new Set(selecionados);
    newSet.has(item_id) ? newSet.delete(item_id) : newSet.add(item_id);
    setSelecionados(newSet);
  };

  function calcularTotalItem(item) {
    const preco = Number(item.produto_preco ?? 0);
    const quantidade = Number(quantidadesTemp[item.item_id] ?? item.item_quantidade ?? 0);
    return preco * quantidade;
  }

  function calcularTotalGeral() {
    return itens
      .filter(item => selecionados.has(item.item_id))
      .reduce((acc, item) => acc + calcularTotalItem(item), 0);
  }

  const irParaPagamento = () => {
    if (selecionados.size === 0) {
      alert('Selecione ao menos um item para continuar');
      return;
    }
    const itemIdsArray = Array.from(selecionados);
    navigate('/pagamento', { state: { itemIds: itemIdsArray } });
  };

  const atualizarQuantidade = async (item_id) => {
    const item = itens.find(i => i.item_id === item_id);
    const novaQuantidade = quantidadesTemp[item_id];

    if (!item || novaQuantidade < 1) return;

    try {
      await axios.put(`/item_carrinho/atualizar/${item_id}`, {
        carrinho_id: item.carrinho_id,
        produto_id: item.produto_id,
        item_quantidade: novaQuantidade,
        item_preco_unitario: item.produto_preco,
      });

      setItens(prev =>
        prev.map(i =>
          i.item_id === item_id ? { ...i, item_quantidade: novaQuantidade } : i
        )
      );

      alert('Quantidade atualizada com sucesso');
    } catch (error) {
      alert('Erro ao atualizar quantidade');
    }
  };

  const removerItem = async (item_id) => {
    try {
      await axios.delete(`/item_carrinho/deletar/${item_id}`);
      setItens(prev => prev.filter(i => i.item_id !== item_id));

      const novoSet = new Set(selecionados);
      novoSet.delete(item_id);
      setSelecionados(novoSet);

      const novasQuantidades = { ...quantidadesTemp };
      delete novasQuantidades[item_id];
      setQuantidadesTemp(novasQuantidades);
    } catch (error) {
      alert('Erro ao remover item');
    }
  };

  if (loading) return <div className="container mt-5">Carregando itens do carrinho...</div>;
  if (erro) return <div className="container alert alert-danger mt-5">{erro}</div>;

  return (
    <div className="container" style={{ paddingTop: '100px' }}>
      <h2 className="mb-4">Meu Carrinho</h2>
      {itens.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <>
          <table className="table table-bordered table-hover">
            <thead className="table-light">
              <tr>
                <th>Selecionar</th>
                <th>Produto</th>
                <th>Quantidade</th>
                <th>Preço Unitário (R$)</th>
                <th>Total (R$)</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {itens.map(item => (
                <tr key={item.item_id}>
                  <td className="text-center">
                    <input
                      type="checkbox"
                      checked={selecionados.has(item.item_id)}
                      onChange={() => toggleSelecionado(item.item_id)}
                    />
                  </td>
                  <td>{item.produto_nome}</td>
                  <td>
                    <input
                      type="number"
                      min={1}
                      value={quantidadesTemp[item.item_id] ?? item.item_quantidade}
                      onChange={(e) =>
                        setQuantidadesTemp({
                          ...quantidadesTemp,
                          [item.item_id]: Number(e.target.value),
                        })
                      }
                      style={{ width: '70px' }}
                      className="form-control form-control-sm"
                    />
                  </td>
                  <td>{Number(item.produto_preco).toFixed(2)}</td>
                  <td>{calcularTotalItem(item).toFixed(2)}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() => atualizarQuantidade(item.item_id)}
                    >
                      Atualizar
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => removerItem(item.item_id)}
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="d-flex justify-content-between align-items-center mt-4">
            <h5>Total geral: R$ {calcularTotalGeral().toFixed(2)}</h5>
            <button className="btn btn-success" onClick={irParaPagamento}>
              Finalizar Compra
            </button>
          </div>
        </>
      )}
    </div>
  );
}
