//Arquivo routes.js e o arquivo que trata as rotas da aplicação

const express = require('express'); //<< O arquivo usa o express
const route = express.Router(); //<< O arquivo usa a função Router do express
const homeController = require('./src/controllers/homeController');//<<importamos o camingo do arquivo
const contatoController = require('./src/controllers/contatoController');




//Rotas da home
route.get('/', homeController.paginaInicial);
route.post('/', homeController.trataPost);

//Rotas de contato
route.get('/contato', contatoController.paginaInicial)

module.exports = route;