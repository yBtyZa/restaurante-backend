const { Router } = require('express');
const clientesController = require('../dominios/clientes/controllers/clientes.controller');

const validaToken = require('../middlewares/validaToken');
const controlePermissao = require('../middlewares/controlePermissao');

const clientesRouter = Router();

clientesRouter.post('/', clientesController.create);
clientesRouter.put('/', validaToken, controlePermissao(['cliente']), clientesController.update);
clientesRouter.delete('/', validaToken, controlePermissao(['cliente']), clientesController.delete);

// Rotas Restaurante
clientesRouter.get('/', validaToken, controlePermissao(['restaurante']), clientesController.listAll);
clientesRouter.get('/:id', validaToken, controlePermissao(['restaurante']), clientesController.listOne);



module.exports = clientesRouter;