const db = require('../utils/db');

const cadastrar = async (
  pagamento_forma,
  pagamento_status,
  usuario_id,
  nome_usuario,
  endereco_id,
  cupom,
  parcelas,
  itemIds
) => {
  const itemIdsString = itemIds.join(',');
  const conn = await db.getConnection();

  try {
    await conn.beginTransaction();

    const [rows] = await conn.query(
      `CALL sp_inserir_pagamento_com_compra(?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        pagamento_forma,
        pagamento_status,
        usuario_id,
        nome_usuario,
        endereco_id,
        cupom,
        parcelas,
        itemIdsString
      ]
    );

    await conn.commit();

    const resultado = rows[0][0]; // resultado da procedure

    return {
      pagamento_id: resultado.pagamento_id,
      compra_id: resultado.compra_id
    };
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
};

const listarTodos = async () => {
  const [rows] = await db.query(`
    SELECT p.pagamento_id, p.pagamento_forma, p.pagamento_status,
           p.pagamento_valor_final, p.pagamento_data, u.usuario_nome
    FROM pagamento p
    JOIN usuario u ON p.usuario_id = u.usuario_id
    ORDER BY p.pagamento_data DESC
  `);
  return rows;
};

const buscarPorId = async (pagamento_id) => {
  const [rows] = await db.query(`
    SELECT p.*, u.usuario_nome FROM pagamento p
    JOIN usuario u ON p.usuario_id = u.usuario_id
    WHERE p.pagamento_id = ?
  `, [pagamento_id]);
  return rows[0];
};

const atualizar = async (
  pagamento_forma,
  pagamento_status,
  usuario_id,
  pagamento_valor_final,
  endereco_id,
  pagamento_id
) => {
  const [result] = await db.query(`
    UPDATE pagamento SET
      pagamento_forma = ?,
      pagamento_status = ?,
      usuario_id = ?,
      pagamento_valor_final = ?,
      endereco_id = ?
    WHERE pagamento_id = ?
  `, [
    pagamento_forma,
    pagamento_status,
    usuario_id,
    pagamento_valor_final,
    endereco_id,
    pagamento_id
  ]);

  return result.affectedRows > 0;
};

const deletar = async (pagamento_id) => {
  const [result] = await db.query(`DELETE FROM pagamento WHERE pagamento_id = ?`, [pagamento_id]);
  return result.affectedRows > 0;
};

module.exports = {
  cadastrar,
  listarTodos,
  buscarPorId,
  atualizar,
  deletar
};
