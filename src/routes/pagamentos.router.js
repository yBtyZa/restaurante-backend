const { Router } = require('express');
const pagamentosController = require('../dominios/pagamentos/controllers/pagamentos.controller');

const pagamentosRouter = Router();

pagamentosRouter.get('/:id', pagamentosController.listOne);

module.exports = pagamentosRouter;