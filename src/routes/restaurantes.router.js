const { Router } = require('express');
const RestauranteController = require('../dominios/restaurantes/controllers/restaurante.controller');
const PratosController = require('../dominios/restaurantes/controllers/pratos.controller');
const validaToken = require('../middlewares/validaToken');

const restauranteRouter = Router();

restauranteRouter.post('/', RestauranteController.create);

//Rotas Pratos
restauranteRouter.post('/:id/pratos', validaToken, PratosController.create)

module.exports = restauranteRouter;