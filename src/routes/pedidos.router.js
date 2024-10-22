const { Router } = require('express');
const pedidosController = require('../dominios/pedidos/controllers/pedidos.controller');

const validaToken = require('../middlewares/validaToken');
const controlePermissao = require('../middlewares/controlePermissao');

const pedidosRouter = Router();

pedidosRouter.post('/', validaToken, controlePermissao([ 'admin', 'restaurante', 'cliente' ]), pedidosController.create);

module.exports = pedidosRouter;