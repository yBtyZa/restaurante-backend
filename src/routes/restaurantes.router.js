const { Router } = require('express');
const RestauranteController = require('../dominios/restaurantes/controllers/restaurante.controller');
const PratosController = require('../dominios/restaurantes/controllers/pratos.controller');
const BebidasController = require('../dominios/restaurantes/controllers/bebidas.controller');
const validaToken = require('../middlewares/validaToken');

const restauranteRouter = Router();

restauranteRouter.post('/', RestauranteController.create);

//Rotas Pratos
restauranteRouter.post('/:id/pratos', validaToken, PratosController.create)

// Rotas Bebidas
restauranteRouter.post('/:id/bebidas', validaToken, BebidasController.create)

module.exports = restauranteRouter;