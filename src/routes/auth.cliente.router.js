const { Router } = require('express');
const AuthClienteController = require('../dominios/login/controllers/auth.cliente.controller');

const authClienteRouter = Router();

authClienteRouter.post('/', AuthClienteController.login);

module.exports = authClienteRouter;