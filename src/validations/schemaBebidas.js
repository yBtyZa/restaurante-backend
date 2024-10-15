const Yup = require('yup');

const schema = Yup.object().shape({
    nome: Yup.string().min(3, 'Nome muito curto').max(100, 'Nome muito longo').required('Nome obrigatório'),
    descricao: Yup.string().min(3, 'Descricão muito curta').max(300, 'Descricão muito longa').required('Descricão obrigatória'),
    preco: Yup.number().required('Preço obrigatório')
        .min(0.01, 'O valor deve ser maior que 0.00')
        .max(999.99, 'O valor deve ser menor que 9999.99')
});

module.exports = schema