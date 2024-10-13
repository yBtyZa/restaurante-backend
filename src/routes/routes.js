const { Router } = require('express');
const restauranteRouter = require('./restaurantes.router');

const routes = Router();

routes.use('/restaurantes', restauranteRouter);

module.exports = routes;