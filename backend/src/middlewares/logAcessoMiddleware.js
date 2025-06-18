const db = require('../utils/db');
const UAParser = require('ua-parser-js');

const parser = new UAParser();

const logAcessoMiddleware = (req, res, next) => {
  const startTime = Date.now();

  res.on('finish', () => {
    const usuario_id = req.usuario?.id || null; 
    // no Postman, é necessário colocar o header User-Agente que é: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/113.0.0.0 Safari/537.36"
    const ip = req.ip || req.connection.remoteAddress || 'Desconhecido';
    const userAgent = req.headers['user-agent'] || 'Desconhecido';

    parser.setUA(userAgent);
    const result = parser.getResult();

    const navegador = result.browser.name
      ? `${result.browser.name} ${result.browser.version || ''}`.trim()
      : 'Navegador desconhecido';

    const sistemaOperacional = result.os.name
      ? `${result.os.name} ${result.os.version || ''}`.trim()
      : 'SO desconhecido';

    const rota = req.originalUrl || req.url;
    const metodo = req.method;
    const status = res.statusCode;
    const duracaoMs = Date.now() - startTime;

    const query = `
      INSERT INTO log_acesso (
        usuario_id,
        logacesso_ip,
        logacesso_navegador,
        logacesso_sistemaoperacional,
        logacesso_rota,
        logacesso_metodo,
        logacesso_status,
        logacesso_duracao_ms,
        logacesso_datahora
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())
    `;

    db.query(
      query,
      [
        usuario_id,
        ip,
        navegador,
        sistemaOperacional,
        rota,
        metodo,
        status,
        duracaoMs
      ],
      (err) => {
        if (err) {
          console.error('❌ Erro ao salvar log de acesso:', err);
        } else {
          console.log('✅ Log de acesso salvo com sucesso!');
        }
      }
    );
  });

  next();
};

module.exports = logAcessoMiddleware;