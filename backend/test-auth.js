// require('dotenv').config();
// const jwt = require('jsonwebtoken');

// const payload = { test: true };
// const secret = process.env.JWT_SECRET || "fallback_"+Date.now();

// console.log("Usando secret:", secret);
// try {
//   const token = jwt.sign(payload, secret);
//   console.log("Token gerado COM SUCESSO:", token);
// } catch (e) {
//   console.error("Falha crítica:", e.message);
// }

// test-token.js
// require('dotenv').config();
// const jwt = require('jsonwebtoken');

// console.log('🔑 JWT_SECRET:', process.env.JWT_SECRET);

// const payload = { id: 1, email: 'teste@teste.com' };
// const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

// console.log('✅ Token gerado:', token);

console.log('Diretório atual:', __dirname);
console.log('Arquivos na pasta:');
require('fs').readdirSync(__dirname).forEach(file => console.log(file));
console.log('Conteúdo do .env:', require('fs').readFileSync('.env', 'utf8'));