const loginSchema = require("../validacoes/loginSchema");
const knex = require("../bancoDeDados/conexao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
    const { email, senha } = req.body;

    try {
        await loginSchema.validate(req.body);

        const usuario = await knex('usuarios').where({ email }).first();

        if (!usuario) {
            return res.status(404).json({ "mensagem": "Usuário não encontrado" });
        }

        const verificarSenha = await bcrypt.compare(senha, usuario.senha);

        if (!verificarSenha) {
            return res.status(400).json({ "mensagem": "Email ou senha inválidos" });
        }

        const idTokenUsuario = { id: usuario.id };

        const token = jwt.sign(idTokenUsuario, process.env.SENHA_HASH, { expiresIn: '1h' });

        const { senha: _, ...dadosUsuario } = usuario;

        return res.status(200).json({
            usuario: dadosUsuario,
            token
        });
    } catch (error) {
        return res.status(400).json({ "mensagem": error.message });
    }
}

module.exports = login;