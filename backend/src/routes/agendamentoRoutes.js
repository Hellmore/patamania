const express = require('express');
const router = express.Router();
const agendamentoController = require('../controllers/agendamentoController');

router.post('/cadastro', agendamentoController.cadastrar);
router.post('/banho-e-tosa', agendamentoController.cadastrarAgendamentoBanhoETosa);
router.post('/consulta-veterinaria', agendamentoController.cadastrarAgendamentoConsulta);
router.post('/passeio', agendamentoController.cadastrarAgendamentoPasseio);
router.post('/hospedagem', agendamentoController.cadastrarAgendamentoHospedagem);
router.get('/lista', agendamentoController.listarTodos); 
router.get('/buscar/:agendamento_id', agendamentoController.buscarPorId); 
router.get('/buscar-por-user/:usuario_id', agendamentoController.buscarPorUser); 
router.put('/atualizar/:agendamento_id', agendamentoController.atualizar);     
router.put('/cancelar/:agendamento_id', agendamentoController.cancelar);     
router.delete('/deletar/:agendamento_id', agendamentoController.deletar);

module.exports = router;