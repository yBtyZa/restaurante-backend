const { Router } = require('express');
const AuthRestauranteController = require('../dominios/login/controllers/auth.restaurante.controller');

const authRestauranteRouter = Router();

authRestauranteRouter.post('/', AuthRestauranteController.login);

module.exports = authRestauranteRouter;