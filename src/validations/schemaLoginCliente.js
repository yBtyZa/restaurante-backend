const Yup = require('yup');

const schema = Yup.object().shape({
    restaurante_id: Yup.number().required('Restaurante obrigatório'),
    email: Yup.string().email('Email inválido').min(5).max(50).required('Email obrigatório'),
    senha: Yup.string().min(8, 'No mínimo 8 caracteres').max(16, 'No máximo 16 caracteres').required('Senha obrigatória')
});

module.exports = schema