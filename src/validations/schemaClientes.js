const Yup = require('yup');

const schema = Yup.object().shape({
    nome: Yup.string().min(3, 'Nome muito curto').max(100, 'Nome muito longo').required('Nome obrigatório'),
    telefone: Yup.string().required('Telefone obrigatório'),
    endereco: Yup.string().required('Endereço obrigatório'),
    email: Yup.string().email('Email inválido').min(5, 'Email muito curto').max(100, 'Email muito longo').required('Email obrigatório'),
    senha: Yup.string().min(8, 'No mínimo 8 caracteres').max(16, 'No máximo 16 caracteres').required('Senha obrigatória')
})

module.exports = schema