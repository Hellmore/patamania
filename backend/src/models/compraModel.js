const db = require('../utils/db');

const listarTodos = () => {
  const query = `SELECT * FROM compra ORDER BY compra_data DESC`;
  return new Promise((resolve, reject) => {
    db.query(query, (err, results) => (err ? reject(err) : resolve(results)));
  });
};

const buscarPorId = (compra_id) => {
  const query = `SELECT * FROM compra WHERE compra_id = ?`;
  return new Promise((resolve, reject) => {
    db.query(query, [compra_id], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]);
    });
  });
};

const buscarPorUsuario = (usuario_id) => {
  const query = `
    SELECT * FROM compra
    WHERE usuario_id = ?
    ORDER BY compra_data DESC
  `;
  return new Promise((resolve, reject) => {
    db.query(query, [usuario_id], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

const deletar = (compra_id) => {
  const query = `DELETE FROM compra WHERE compra_id = ?`;
  return new Promise((resolve, reject) => {
    db.query(query, [compra_id], (err, result) => {
      if (err) return reject(err);
      resolve(result.affectedRows > 0);
    });
  });
};

/**
 * Função para buscar as compras de um usuário com detalhes:
 * inclui itens comprados, cupom, pagamento, parcelas, etc.
 */
const buscarDetalhadoPorUsuario = (usuario_id) => {
  const query = `
    SELECT
      c.compra_id,
      c.compra_data,
      c.compra_valortotal,
      cup.cupomdesconto_codigo,
      p.pagamento_forma,
      p.pagamento_parcelas,
      cis.compra_item_selecionado_id,
      cis.item_quantidade,
      prod.produto_nome
    FROM compra c
    LEFT JOIN cupom_desconto cup ON c.cupomdesconto_id = cup.cupomdesconto_id
    LEFT JOIN pagamento p ON c.pagamento_id = p.pagamento_id
    LEFT JOIN compra_item_selecionado cis ON cis.compra_id = c.compra_id
    LEFT JOIN produto prod ON cis.produto_id = prod.produto_id
    WHERE c.usuario_id = ?
    ORDER BY c.compra_data DESC, c.compra_id, cis.compra_item_selecionado_id;
  `;

  return new Promise((resolve, reject) => {
    db.query(query, [usuario_id], (err, results) => {
      if (err) return reject(err);

      // Agrupar resultados por compra_id
      const comprasMap = new Map();

      results.forEach((row) => {
        let compra = comprasMap.get(row.compra_id);
        if (!compra) {
          compra = {
            compra_id: row.compra_id,
            compra_data: row.compra_data,
            compra_valortotal: row.compra_valortotal,
            cupomdesconto_codigo: row.cupomdesconto_codigo,
            pagamento_forma: row.pagamento_forma,
            pagamento_parcelas: row.pagamento_parcelas,
            itens: [],
          };
          comprasMap.set(row.compra_id, compra);
        }

        if (row.compra_item_selecionado_id) {
          compra.itens.push({
            compra_item_selecionado_id: row.compra_item_selecionado_id,
            produto_nome: row.produto_nome,
            item_quantidade: row.item_quantidade,
          });
        }
      });

      resolve(Array.from(comprasMap.values()));
    });
  });
};

module.exports = {
  listarTodos,
  buscarPorId,
  buscarPorUsuario,
  deletar,
  buscarDetalhadoPorUsuario,
};
