const AuthRestauranteServices = require('../services/auth.restaurante.services');
const schema = require('../../../validations/schemaLoginRestaurante');
const Yup = require('yup');

class AuthRestauranteController {

    async login(req, res) {
        const { body } = req;
        try {
            // Valida o body da requisição com o esquema Yup
            await schema.validate(body, { abortEarly: false });

            // Efetua o login do restaurante e retorna o token
            const login = await AuthRestauranteServices.login(body);
            return res.status(200).json(login);
        } catch (error) {
            // Verifica se o erro é de validação do Yup
            if (error instanceof Yup.ValidationError) {
                return res.status(400).json({ message: error.errors });
            }

            // Verifica se o erro é relacionado ao email nao encontrado
            if (error.message === "Email não encontrado") {
                return res.status(400).json({ message: error.message });
            }

            // Verifica se o erro é relacionado a senha invalida
            if (error.message === "Senha inválida") {
                return res.status(400).json({ message: error.message });
            }

            // Para outros erros, retorna status 500
            return res.status(500).json(error.message);
        }
    }
}

module.exports = new AuthRestauranteController()