const express = require('express'); 
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();

// Middlewares
app.use(express.json());  
app.use(bodyParser.json());
app.use(express.static(__dirname));    

// Importação de rotas
const usuarioRoutes = require('./src/routes/usuarioRoutes');
const animalRoutes = require('./src/routes/animalRoutes');
const enderecoRoutes = require('./src/routes/enderecoRoutes');
const produtoRoutes = require('./src/routes/produtoRoutes');

// Uso das rotas
app.use('/usuarios', usuarioRoutes);
app.use('/animais', animalRoutes);
app.use('/enderecos', enderecoRoutes);
app.use('/produtos', produtoRoutes)

// Inicialização do servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
