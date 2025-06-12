const db = require('../utils/db');

const cadastrar = (usuario) => {
    return new Promise((resolve, reject) => {
        const query = `
            INSERT INTO usuario 
                (usuario_nome, usuario_email, usuario_senha, usuario_dataNascimento, usuario_tipo, usuario_pais, usuario_dataInscricao) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            usuario.usuario_nome,
            usuario.usuario_email,
            usuario.usuario_senha,
            usuario.usuario_dataNascimento,
            usuario.usuario_tipo,
            usuario.usuario_pais,
            usuario.usuario_dataInscricao
        ];

        db.query(query, values, (err, result) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            resolve(result);
        });
    });
};

const listarTodos = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM usuario', (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

const buscarPorId = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM usuario WHERE usuario_id = ?', [id], (err, result) => {
            if (err) return reject(err);
            resolve(result[0]);
        });
    });
};

const buscarPorEmail = (email) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM usuario WHERE usuario_email = ?', [email], (err, result) => {
            if (err) return reject(err);
            resolve(result[0]);
        });
    });
};

const atualizarRefreshToken = (usuario_id, refreshToken) => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE usuario SET usuario_refresh_token = ? WHERE usuario_id = ?';
        db.query(query, [refreshToken, usuario_id], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};

const atualizar = (id, dados) => {
  return new Promise((resolve, reject) => {
    const campos = [];
    const valores = [];
    
    for (const [key, value] of Object.entries(dados)) {
      if (value !== undefined && value !== null) {
        campos.push(`${key} = ?`);
        valores.push(value);
      }
    }
    
    if (campos.length === 0) {
      return reject(new Error('Nenhum campo para atualizar'));
    }
    
    valores.push(id);
    
    const query = `UPDATE usuario SET ${campos.join(', ')} WHERE usuario_id = ?`;
    console.log('Query SQL:', query); // Log para debug
    console.log('Valores:', valores); // Log para debug
    
    db.query(query, valores, (err, result) => {
      if (err) {
        console.error('Erro na query:', err);
        return reject(err);
      }
      console.log('Resultado da atualização:', result);
      resolve(result);
    });
  });
};

const excluir = (id) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM usuario WHERE usuario_id = ?', [id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

module.exports = {
    cadastrar,
    listarTodos,
    buscarPorId,
    buscarPorEmail,
    atualizarRefreshToken,
    atualizar,
    excluir
};