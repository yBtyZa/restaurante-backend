const { Router } = require('express');
const clientesController = require('../dominios/clientes/controllers/clientes.controller');

const clientesRouter = Router();

clientesRouter.post('/', clientesController.create);

module.exports = clientesRouter;