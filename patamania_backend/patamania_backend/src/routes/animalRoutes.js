const express = require('express');
const router = express.Router();
const animalController = require('../controllers/animalController');

router.post('/cadastro', animalController.cadastrar);

module.exports = router;
