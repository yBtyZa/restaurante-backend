const { Router } = require('express');
const pedidosController = require('../dominios/pedidos/controllers/pedidos.controller');

const pedidosRouter = Router();

pedidosRouter.post('/', pedidosController.create);

module.exports = pedidosRouter;