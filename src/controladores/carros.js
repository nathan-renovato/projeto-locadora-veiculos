const alugarCarroSchema = require("../validacoes/alugarCarroSchema");

const alugarCarro = async (req, res) => {
    const { data_locacao, data_devolucao } = req.body;
    const { idCarro } = req.params;
    try {
        await alugarCarroSchema.validate(req.body);

        return res.status(200).json({ "mensagem": "Deu certo" });
    } catch (error) {
        return res.status(400).json({ "mensagem": error.mensagem });
    }
}

module.exports = {
    alugarCarro
}