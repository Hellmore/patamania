const bcrypt = require('bcryptjs');

const gerarHash = async (senha) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(senha, salt);
};

const verificarSenha = async (senhaRecebida, senhaHashada) => {
  return bcrypt.compare(senhaRecebida, senhaHashada);
};

module.exports = { gerarHash, verificarSenha };
