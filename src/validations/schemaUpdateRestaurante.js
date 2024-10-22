const Yup = require('yup');

const schema = Yup.object().shape({
    nome: Yup.string().min(3).max(100),
    email: Yup.string().email('Email inválido').min(5).max(50),
    senha: Yup.string().min(8, 'No mínimo 8 caracteres').max(16, 'No máximo 16 caracteres')
});

module.exports = schema