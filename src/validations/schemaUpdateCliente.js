const Yup = require('yup');

const schema = Yup.object().shape({
    nome: Yup.string().min(3, 'Nome muito curto').max(100, 'Nome muito longo'),
    telefone: Yup.string(),
    endereco: Yup.string(),
    email: Yup.string().email('Email inválido').min(5, 'Email muito curto').max(100, 'Email muito longo'),
    senha: Yup.string().min(8, 'No mínimo 8 caracteres').max(16, 'No máximo 16 caracteres')
})

module.exports = schema