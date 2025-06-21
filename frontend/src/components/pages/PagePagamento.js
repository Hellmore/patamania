import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PagePagamento = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const itensSelecionadosFromState = location.state?.itensSelecionados || [];

  const usuario = JSON.parse(localStorage.getItem("user"));
  const usuarioId = usuario?.id;

  const [itensSelecionados, setItensSelecionados] = useState([]);
  const [formaPagamento, setFormaPagamento] = useState("CARTAO");
  const [cupom, setCupom] = useState("");
  const [parcelas, setParcelas] = useState(1);
  const [enderecoId, setEnderecoId] = useState(1);
  const [nomeUsuario, setNomeUsuario] = useState(usuario?.nome || "Usuário");

  useEffect(() => {
    if (itensSelecionadosFromState.length === 0) {
      alert("Nenhum item selecionado para pagamento.");
      navigate("/carrinho");
    } else {
      setItensSelecionados(itensSelecionadosFromState);
    }
  }, [itensSelecionadosFromState, navigate]);

  const calcularTotal = () => {
    return itensSelecionados.reduce((total, item) => {
      const preco = Number(item.produto_preco);
      const qtd = Number(item.item_quantidade);
      return total + preco * qtd;
    }, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (itensSelecionados.length === 0) {
      alert("Selecione ao menos um item para finalizar a compra.");
      return;
    }

    if (parcelas < 1 || parcelas > 6) {
      alert("Parcelas devem estar entre 1 e 6.");
      return;
    }

    const itemIds = itensSelecionados.map(item => item.item_id);

    const pagamentoData = {
      pagamento_forma: formaPagamento,
      pagamento_status: "PAGO",
      usuario_id: usuarioId,
      nome_usuario: nomeUsuario,
      endereco_id: enderecoId,
      cupom: cupom.trim() === "" ? null : cupom.trim(),
      parcelas,
      item_ids: itemIds,
    };

    try {
      const response = await fetch("http://localhost:3001/pagamento/cadastro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pagamentoData),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Erro ao registrar pagamento");
      }

      alert("Pagamento registrado com sucesso!");
      navigate("/");
    } catch (error) {
      alert("Erro: " + error.message);
    }
  };

  return (
    <div className="container mt-5 pt-5">
      <h2>Finalizar Pagamento</h2>

      <div className="mb-4">
        <h5>Itens Selecionados:</h5>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Produto</th>
              <th>Quantidade</th>
              <th>Preço Unitário (R$)</th>
              <th>Total (R$)</th>
            </tr>
          </thead>
          <tbody>
            {itensSelecionados.map(item => (
              <tr key={item.item_id}>
                <td>{item.produto_nome}</td>
                <td>{item.item_quantidade}</td>
                <td>{Number(item.produto_preco).toFixed(2)}</td>
                <td>{(item.item_quantidade * item.produto_preco).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h5>Total da compra: R$ {calcularTotal().toFixed(2)}</h5>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Forma de Pagamento (Suas informações de pagamento salvas serão utilizadas):</label>
          <select
            value={formaPagamento}
            onChange={(e) => setFormaPagamento(e.target.value)}
            className="form-select"
          >
            <option value="CARTAO">Cartão</option>
            <option value="BOLETO">Boleto</option>
            <option value="PIX">PIX</option>
          </select>
        </div>

        <div className="mb-3">
          <label>Cupom (opcional):</label>
          <input
            type="text"
            className="form-control"
            value={cupom}
            onChange={(e) => setCupom(e.target.value)}
            placeholder="Digite código do cupom"
          />
        </div>

        <div className="mb-3">
          <label>Parcelas:</label>
          <input
            type="number"
            min="1"
            max="6"
            className="form-control"
            value={parcelas}
            onChange={(e) => setParcelas(Number(e.target.value))}
            disabled={formaPagamento !== "CARTAO"}
          />
        </div>

        <button type="submit" className="btn btn-success">
          Confirmar Pagamento
        </button>
      </form>
    </div>
  );
};

export default PagePagamento;
