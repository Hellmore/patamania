const express = require('express'); 
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express(); 
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

// Debug final (remova depois)
console.log('JWT_SECRET carregado:', process.env.JWT_SECRET ? '✔️' : '❌');

const logOperacaoMiddleware = require('./src/middlewares/logOperacaoMiddleware');
const logAcessoMiddleware = require('./src/middlewares/logAcessoMiddleware');

app.use(logAcessoMiddleware);
app.use(logOperacaoMiddleware);

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
const servicoRoutes = require('./src/routes/servicoRoutes');
const banhoETosaRoutes = require('./src/routes/banhoETosaRoutes');
const consultaVeterinariaRoutes = require('./src/routes/consultaVeterinariaRoutes');
const passeioRoutes = require('./src/routes/passeioRoutes');
const hospedagemRoutes = require('./src/routes/hospedagemRoutes');
const carrinhoRoutes = require('./src/routes/carrinhoRoutes');
const itemCarrinhoRoutes = require('./src/routes/itemCarrinhoRoutes');
const compraItemSelecionadoRoutes = require('./src/routes/compraItemSelecionadoRoutes');
const pagamentoRoutes = require('./src/routes/pagamentoRoutes');
const historicoPedidoRoutes = require('./src/routes/historicoPedidoRoutes');
const logPagamentoRoutes = require('./src/routes/logPagamentoRoutes');
const compraRoutes = require('./src/routes/compraRoutes');
const cupomDescontoRoutes = require('./src/routes/cupomDescontoRoutes');
const avaliacaoProdutoRoutes = require('./src/routes/avaliacaoProdutoRoutes');
const avaliacaoServicoRoutes = require('./src/routes/avaliacaoServicoRoutes');
const historicoAnimalRoutes = require('./src/routes/historicoAnimalRoutes');
const logErroRoutes = require('./src/routes/logErroRoutes');

// Uso das rotas
app.use('/usuarios', usuarioRoutes);
app.use('/animais', animalRoutes);
app.use('/enderecos', enderecoRoutes);
app.use('/produtos', produtoRoutes);
app.use('/login', loginRoutes);
app.use('/agendamentos', agendamentoRoutes);
app.use('/servicos', servicoRoutes);
app.use('/banho-e-tosa', banhoETosaRoutes);
app.use('/consulta-veterinaria', consultaVeterinariaRoutes);
app.use('/passeio', passeioRoutes);
app.use('/hospedagem', hospedagemRoutes);
app.use('/carrinho', carrinhoRoutes);
app.use('/item_carrinho', itemCarrinhoRoutes);
app.use('/compra_item_selecionado', compraItemSelecionadoRoutes);
app.use('/pagamento', pagamentoRoutes);
app.use('/historico_pedido', historicoPedidoRoutes);
app.use('/log_pagamento', logPagamentoRoutes);
app.use('/compra', compraRoutes);
app.use('/cupons', cupomDescontoRoutes);
app.use('/avaliacoes-produto', avaliacaoProdutoRoutes);
app.use('/avaliacoes-servico', avaliacaoServicoRoutes);
app.use('/historico-animal', historicoAnimalRoutes);
app.use('/log-erro', logErroRoutes);

// Middleware de tratamento de erros 
app.use((err, req, res, next) => {
    // Log detalhado do erro
    console.error(`[ERRO] ${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
    console.error(err.stack);

    // Controla resposta conforme ambiente
    const isDevelopment = process.env.NODE_ENV !== 'production';

    res.status(500).json({
        error: 'Erro interno no servidor',
        ...(isDevelopment && { message: err.message, stack: err.stack })
    });
});

const logErrosMiddleware = require('./src/middlewares/logErrosMiddleware');
app.use(logErrosMiddleware);

module.exports = app;
