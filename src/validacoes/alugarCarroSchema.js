const yup = require("./yup");

const alugarCarroSchema = yup.object().shape({
    data_locacao: yup
        .string()
        .length(8)
        .required,

    data_devolucao: yup
        .string()
        .length(8)
        .required()
});

module.exports = alugarCarroSchema;