const yup = require("./yup");

const cadastrarUsuarioSchema = yup.object().shape({
    nome: yup
        .string()
        .required(),

    email: yup
        .string()
        .email()
        .required(),

    telefone: yup
        .string()
        .length(11, 'É necessário informar 11 números no telefone')
        .required(),

    data_nascimento: yup
        .string()
        .length(8, 'É necessário informar 8 números na data de nascimento')
        .required(),

    cpf: yup
        .string()
        .length(11, 'É necessário informar 11 números no CPF')
        .required(),

    endereco: yup
        .string()
        .required(),

    numero_cartao_credito: yup
        .string()
        .length(16, 'É necessário informar 16 números do cartão de crédito')
        .required(),

    validade: yup
        .string()
        .length(6, 'É necessário informar 6 números na validade')
        .required(),

    codigo_verificacao: yup
        .string()
        .length(3, 'É necessário informar 3 números no código de verificação')
        .required(),

    senha: yup
        .string()
        .length(8)
        .required()
});

module.exports = cadastrarUsuarioSchema;