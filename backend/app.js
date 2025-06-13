const express = require('express'); 
const bodyParser = require('body-parser');
// require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env
const cors = require('cors');
const app = express(); 

// ----------------------
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

// Debug final (remova depois)
console.log('JWT_SECRET carregado:', process.env.JWT_SECRET ? '✔️' : '❌');
// ----------------------

// Middlewares
app.use(cors());
app.use(express.json());  
app.use(bodyParser.json());
app.use(express.static(__dirname));    

// Importação de rotas
const usuarioRoutes = require('./src/routes/usuarioRoutes');
const animalRoutes = require('./src/routes/animalRoutes');
const enderecoRoutes = require('./src/routes/enderecoRoutes');
const produtoRoutes = require('./src/routes/produtoRoutes');
const loginRoutes = require('./src/routes/loginRoutes');
const agendamentoRoutes = require('./src/routes/agendamentoRoutes');

// Uso das rotas
app.use('/usuarios', usuarioRoutes);
app.use('/animais', animalRoutes);
app.use('/enderecos', enderecoRoutes);
app.use('/produtos', produtoRoutes);
app.use('/login', loginRoutes);
app.use('/agendamentos', agendamentoRoutes);

// Middleware de tratamento de erros (deve vir após as rotas)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Erro interno no servidor' });
});

module.exports = app;
