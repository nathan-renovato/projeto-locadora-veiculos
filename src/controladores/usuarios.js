const knex = require('../bancoDeDados/conexao');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { format } = require('date-fns');
const cadastrarUsuarioSchema = require('../validacoes/cadastroUsuarioSchema');

const cadastrarUsuario = async (req, res) => {
    const { nome, email, telefone, data_nascimento, cpf, endereco, numero_cartao_credito, validade, codigo_verificacao, senha } = req.body;


    try {
        await cadastrarUsuarioSchema.validate(req.body);

        const existeEmail = await knex('usuarios').where({ email }).first();

        if (existeEmail) {
            return res.status(400).json({ "mensagem": "O email informado já existe" });
        }

        const existeCPF = await knex('usuarios').where({ cpf }).first();

        if (existeCPF) {
            return res.status(400).json({ "mensagem": "O CPF informado já existe" });
        }

        const dia = data_nascimento.substr(0, 2);
        const mes = Number(data_nascimento.substr(2, 2));
        const ano = data_nascimento.substr(4, 4);

        const nascimentoTimestamptz = format(new Date(ano, mes - 1, dia), 'dd/MM/yyyy');

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const usuario = await knex('usuarios').insert({
            nome,
            email,
            telefone,
            data_de_nascimento: nascimentoTimestamptz,
            cpf,
            endereco,
            senha: senhaCriptografada
        });


        if (!usuario) {
            return res.status(400).json({ "mensagem": "O usuário não foi cadastrado" });
        }

        const buscarUsuario = await knex('usuarios').where({ email }).first();
        const numeroCartaoCriptografado = await bcrypt.hash(numero_cartao_credito, 10);
        const validadeCartaoCriptografada = await bcrypt.hash(validade, 10);
        const codigoVerificacaoCriptografado = await bcrypt.hash(codigo_verificacao, 10);

        const cartaoCredito = await knex('cartao_credito').insert({
            numero_cartao_credito: numeroCartaoCriptografado,
            validade: validadeCartaoCriptografada,
            codigo_verificacao: codigoVerificacaoCriptografado,
            usuario_id: buscarUsuario.id
        })

        if (!cartaoCredito) {
            return res.status(400).json({ "mensagem": "O cartão de crédito não foi cadastrado" });
        }

        return res.status(200).json({ "mensagem": "Usuário cadastrado com sucesso" });
    } catch (error) {
        return res.status(400).json({ "mensagem": error.message });
    }
}

module.exports = {
    cadastrarUsuario
};