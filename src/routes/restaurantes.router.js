const { Router } = require('express');
const RestauranteController = require('../dominios/restaurantes/controllers/restaurante.controller');
const PratosController = require('../dominios/restaurantes/controllers/pratos.controller');
const BebidasController = require('../dominios/restaurantes/controllers/bebidas.controller');
const validaToken = require('../middlewares/validaToken');
const controlePermissao = require('../middlewares/controlePermissao');

const restauranteRouter = Router();

restauranteRouter.post('/', validaToken, controlePermissao(['admin']), RestauranteController.create);
restauranteRouter.get('/:id', RestauranteController.listOne);

//Rotas Pratos
restauranteRouter.post('/:id/pratos', validaToken, controlePermissao(['restaurante']), PratosController.create)

// Rotas Bebidas
restauranteRouter.post('/:id/bebidas', validaToken, controlePermissao(['restaurante']), BebidasController.create)

module.exports = restauranteRouter;