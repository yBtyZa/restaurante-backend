const { Router } = require('express');
const restauranteRouter = require('./restaurantes.router');
const authRestauranteRouter = require('./auth.restaurante');

const routes = Router();

routes.use('/restaurantes', restauranteRouter);
routes.use('/login', authRestauranteRouter);

module.exports = routes;