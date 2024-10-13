const { Router } = require('express');
const RestauranteController = require('../dominios/restaurantes/controllers/restaurante.controller');

const restauranteRouter = Router();

restauranteRouter.post('/', RestauranteController.create);

module.exports = restauranteRouter;