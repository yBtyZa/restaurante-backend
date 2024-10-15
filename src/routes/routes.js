const { Router } = require('express');
const restauranteRouter = require('./restaurantes.router');
const authRestauranteRouter = require('./auth.restaurante');
const clientesRouter = require('./clientes.router');
const validaToken = require('../middlewares/validaToken');

const routes = Router();

routes.use('/restaurantes', restauranteRouter);
routes.use('/login', authRestauranteRouter);
routes.use('/clientes', clientesRouter);

module.exports = routes;