const { Router } = require('express');
const pagamentosController = require('../dominios/pagamentos/controllers/pagamentos.controller');

const pagamentosRouter = Router();

pagamentosRouter.post('/', pagamentosController.list);

module.exports = pagamentosRouter;