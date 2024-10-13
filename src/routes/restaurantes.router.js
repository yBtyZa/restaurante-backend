const { Router } = require('express');
const RestauranteController = require('../controllers/restaurante.controller');

const restauranteRouter = Router();

restauranteRouter.post('/', RestauranteController.create);

module.exports = restauranteRouter;