const express = require('express');
const usuarios = require('./controladores/usuarios');
const login = require('./controladores/login');
const carros = require("./controladores/carros");


const verificarLogin = require("./filtros/verificarLogin");

const rotas = express();

rotas.post('/cadastro', usuarios.cadastrarUsuario);
rotas.post('/login', login);

rotas.use(verificarLogin);

rotas.post('/alugar/:idCarro', carros.alugarCarro);

module.exports = rotas;