const { Router } = require('express');
const pagamentosController = require('../dominios/pagamentos/controllers/pagamentos.controller');

const validaToken = require('../middlewares/validaToken');
const controlePermissao = require('../middlewares/controlePermissao');

const pagamentosRouter = Router();

pagamentosRouter.get('/:id', validaToken, controlePermissao([ 'admin', 'restaurante', 'cliente' ]), pagamentosController.listOne);

module.exports = pagamentosRouter;