const { Router } = require('express');
const restauranteRouter = require('./restaurantes.router');
const authRestauranteRouter = require('./auth.restaurante.router');
const clientesRouter = require('./clientes.router');
const authClienteRouter = require('./auth.cliente.router');
const validaToken = require('../middlewares/validaToken');

const routes = Router();

routes.use('/restaurantes', restauranteRouter);
routes.use('/login/restaurantes', authRestauranteRouter);
routes.use('/clientes', validaToken, clientesRouter);
routes.use('/login/clientes', authClienteRouter);

module.exports = routes;