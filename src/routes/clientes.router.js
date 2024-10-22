const { Router } = require('express');
const clientesController = require('../dominios/clientes/controllers/clientes.controller');

const validaToken = require('../middlewares/validaToken');
const controlePermissao = require('../middlewares/controlePermissao');

const clientesRouter = Router();

clientesRouter.post('/', clientesController.create);
clientesRouter.get('/', validaToken, controlePermissao(['restaurante']), clientesController.listAll);



module.exports = clientesRouter;