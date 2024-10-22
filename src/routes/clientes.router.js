const { Router } = require('express');
const clientesController = require('../dominios/clientes/controllers/clientes.controller');

const validaToken = require('../middlewares/validaToken');
const controlePermissao = require('../middlewares/controlePermissao');

const clientesRouter = Router();

clientesRouter.post('/', clientesController.create);

// Rotas Restaurante
clientesRouter.get('/', validaToken, controlePermissao(['restaurante']), clientesController.listAll);
clientesRouter.get('/:id', validaToken, controlePermissao(['restaurante']), clientesController.listOne);



module.exports = clientesRouter;