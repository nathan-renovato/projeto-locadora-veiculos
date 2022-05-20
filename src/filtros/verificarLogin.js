const knex = require("../bancoDeDados/conexao");
const jwt = require('jsonwebtoken');

const verificarLogin = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ "mensagem": "Não autorizado" });
    }

    try {
        const token = authorization.replace('Bearer ', '').trim();


        const { id } = jwt.verify(token, process.env.SENHA_HASH);

        const usuarioExiste = await knex("usuarios").where({ id }).first();

        if (!usuarioExiste) {
            return res.status(404).json({ "mensagem": "Token inválido" });
        }

        const { senha, ...usuario } = usuarioExiste;

        req.usuario = usuario;

        next();
    } catch (error) {
        return res.status(400).json({ "mensagem": error.mensagem });
    }
}

module.exports = verificarLogin;