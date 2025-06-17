const jwt = require('jsonwebtoken');

const verificarAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>

  if (!token) return res.status(401).json({ message: 'Token não fornecido' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // use a mesma chave da geração

    if (!decoded.tipo || decoded.tipo.toLowerCase() !== 'admin') {
      return res.status(403).json({ message: 'Acesso restrito a administradores' });
    }


    req.usuario = decoded; // adiciona dados do usuário ao request
    next(); // continua para a rota protegida
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};

module.exports = verificarAdmin;
