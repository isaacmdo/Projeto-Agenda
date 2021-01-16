//Arquivo routes.js e o arquivo que trata as rotas da aplicação

const express = require('express'); //<< O arquivo usa o express
const route = express.Router(); //<< O arquivo usa a função Router do express
const homeController = require('./src/controllers/homeController');//<<importamos o camingo do arquivo
const loginController = require('./src/controllers/loginController');//<<importamos o camingo do arquivo

//Rotas da home
route.get('/', homeController.index);

//Rotas de login
route.get('/login/index', loginController.index);
route.post('/login/register', loginController.register);
route.post('/login/login', loginController.login);

module.exports = route;