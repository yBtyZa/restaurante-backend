const { Router } = require('express');
const restauranteRouter = require('./restaurantes.router');
const authRestauranteRouter = require('./auth.restaurante.router');
const clientesRouter = require('./clientes.router');
const authClienteRouter = require('./auth.cliente.router');
const pedidosRouter = require('./pedidos.router');
const pagamentosRouter = require('./pagamentos.router');

const routes = Router();

routes.use('/restaurantes', restauranteRouter);
routes.use('/clientes', clientesRouter);
routes.use('/login-restaurantes', authRestauranteRouter);
routes.use('/login-clientes', authClienteRouter);
routes.use('/pedidos',  pedidosRouter);
routes.use('/pagamentos', pagamentosRouter);


module.exports = routes;