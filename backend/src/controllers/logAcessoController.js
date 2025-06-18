const logAcessoModel = require('../models/logAcessoModel');

const UAParser = require('ua-parser-js');
const parser = new UAParser();

const cadastrar = async (req, res) => {
    const { usuario_id, logacesso_sucesso } = req.body;

    if (!usuario_id || logacesso_sucesso === undefined) {
        return res.status(400).send("Campos obrigatórios: usuario_id e logacesso_sucesso");
    }

    // Captura IP
    const ip = req.ip || req.connection.remoteAddress;

    // Captura navegador e sistema operacional
const userAgentHeader = req.headers['user-agent'] || '';
parser.setUA(userAgentHeader);

const resultado = parser.getResult();

const navegador = resultado.browser.name && resultado.browser.version
    ? `${resultado.browser.name} ${resultado.browser.version}`
    : 'Navegador desconhecido';

const sistema = resultado.os.name && resultado.os.version
    ? `${resultado.os.name} ${resultado.os.version}`
    : 'Sistema desconhecido';

    try {
        await logAcessoModel.cadastrar(
            usuario_id,
            ip,
            navegador,
            sistema,
            logacesso_sucesso
        );
        res.status(201).send("Log de acesso registrado com sucesso!");
    } catch (err) {
        res.status(500).send("Erro ao registrar log: " + err.message);
    }
};

const listarTodos = async (req, res) => {
    try {
        const logs = await logAcessoModel.listarTodos();
        res.json(logs);
    } catch (err) {
        res.status(500).send("Erro ao listar logs: " + err.message);
    }
};

const buscarPorLogacessoId = async (req, res) => {
    const { logacesso_id } = req.params;

    try {
        const log = await logAcessoModel.buscarPorLogacessoId(logacesso_id);
        if (!log) {
            return res.status(404).send("Log não encontrado.");
        }
        res.json(log);
    } catch (err) {
        res.status(500).send("Erro ao buscar log: " + err.message);
    }
};

module.exports = {
    cadastrar,
    listarTodos,
    buscarPorLogacessoId
};