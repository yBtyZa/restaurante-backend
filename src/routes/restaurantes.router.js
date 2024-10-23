const { Router } = require('express');
const RestauranteController = require('../dominios/restaurantes/controllers/restaurante.controller');
const PratosController = require('../dominios/restaurantes/controllers/pratos.controller');
const BebidasController = require('../dominios/restaurantes/controllers/bebidas.controller');
const validaToken = require('../middlewares/validaToken');
const controlePermissao = require('../middlewares/controlePermissao');

const restauranteRouter = Router();

restauranteRouter.post('/', validaToken, controlePermissao(['admin']), RestauranteController.create);
restauranteRouter.get('/', validaToken, controlePermissao(['restaurante']), RestauranteController.listLogged);
restauranteRouter.put('/', validaToken, controlePermissao(['restaurante']), RestauranteController.update);
restauranteRouter.delete('/', validaToken, controlePermissao(['restaurante']), RestauranteController.delete);


// Rotas publicas
restauranteRouter.get('/all', RestauranteController.listAll);
restauranteRouter.get('/:id', RestauranteController.listOne);

// Rotas Pratos privadas
restauranteRouter.post('/:id/pratos', validaToken, controlePermissao(['restaurante']), PratosController.create)
restauranteRouter.put('/:id/pratos/:prato_id', validaToken, controlePermissao(['restaurante']), PratosController.update)
restauranteRouter.delete('/:id/pratos/:prato_id', validaToken, controlePermissao(['restaurante']), PratosController.delete)

// Rotas Pratos publicas
restauranteRouter.get('/:id/pratos/all', PratosController.listAll)
restauranteRouter.get('/:id/pratos/:prato_id', PratosController.listOne)

// Rotas Bebidas privadas
restauranteRouter.post('/:id/bebidas', validaToken, controlePermissao(['restaurante']), BebidasController.create)
restauranteRouter.put('/:id/bebidas/:bebida_id', validaToken, controlePermissao(['restaurante']), BebidasController.update)

module.exports = restauranteRouter;