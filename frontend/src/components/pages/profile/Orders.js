import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';

export default function Orders() {
  const { user } = useAuth();
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    if (!user) return;

    async function fetchPedidos() {
      try {
        const response = await axios.get(`/compra/usuario/${user.id}/detalhado`);
        console.log('Pedidos recebidos:', response.data);
        setPedidos(response.data);
        setLoading(false);
      } catch (error) {
        setErro('Erro ao carregar pedidos.');
        setLoading(false);
      }
    }

    fetchPedidos();
  }, [user]);

  if (loading) return <div className="container mt-5">Carregando pedidos...</div>;
  if (erro) return <div className="container mt-5 alert alert-danger">{erro}</div>;

  if (pedidos.length === 0) return <div className="container mt-5">Nenhum pedido encontrado.</div>;

  return (
    <div className="container" style={{ paddingTop: '100px' }}>
      <h2 className="mb-4">Meus Pedidos</h2>
      {pedidos.map((pedido) => (
        <div key={pedido.compra_id} className="card mb-4">
          <div className="card-header">
            <strong>Data da Compra:</strong> {new Date(pedido.compra_data).toLocaleDateString()}
          </div>
          <div className="card-body">
            <p><strong>Cupom Utilizado:</strong> {pedido.cupomdesconto_codigo || 'Nenhum'}</p>
            <p><strong>Valor Original:</strong> R$ {pedido.compra_valor_original?.toFixed(2) ?? '0.00'}</p>
            <p><strong>Valor Final:</strong> R$ {pedido.compra_valortotal?.toFixed(2) ?? '0.00'}</p>
            <p><strong>Método de Pagamento:</strong> {pedido.pagamento_forma || 'N/A'}</p>
            <p><strong>Número de Parcelas:</strong> {pedido.pagamento_parcelas || 1}</p>

            <h5>Produtos Comprados:</h5>
            <table className="table table-sm table-bordered">
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Quantidade</th>
                </tr>
              </thead>
              <tbody>
                {pedido.itens.map(item => (
                  <tr key={item.compra_item_selecionado_id}>
                    <td>{item.produto_nome}</td>
                    <td>{item.item_quantidade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
