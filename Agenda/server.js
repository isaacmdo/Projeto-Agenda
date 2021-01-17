//Dot env está relacionado a coisa do seu ambiene de desenvolvimento pessoal (senhas, emails, acessos..), que não queremos jogar em um repositorio publico
//aquivo .env contem os dados do servidor e podemos no adicionar o mesmo no .gitignore
require('dotenv').config();


//Aqui usamos e iniciamos o app do express
const express = require('express');
const { allowedNodeEnvironmentFlags } = require('process');
const app = express();

//Mongoose e qual vai modelar os dados da base de dados, e garantir que eles seram salvos da forma que queremos
//Mongoose retorna uma promise
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTIONSTRING, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  useFindAndModify: false 
})
  .then(() => {
    console.log('Conectei a base de dados');
    app.emit('Pronto');
  })
  .catch(e => console.log(e));
//Criamos um schema para modelar os dados


//express-session e uma extensao do express para trabalharmos com cookies do navegador, assim podendo iniciaruma sessão para cada usuario
//identificando os usuarios que ja foram conectados, assim podendo por exemplo criar um autologon do usuario com base na sessao
  const session = require('express-session');

//MongoStore e para salvar as sessoes dentro da base de dados, pois por padrao elas são salvas na memoria
  const MongoStore = require('connect-mongo')(session);

//connect-flash e uma dependencia para mensagens flash, mensagens temporarias para alguns feedback por exemplo, assim que o usuario ler, ela não existira mais na base de dados
//E essas mensagens sao salvas na sessao
  const flash = require('connect-flash');

//routes são as rotas da aplicação
const routes = require('./routes')

//path e para trabalhar com caminhos absolutos
const path = require('path');

//helmet e a segurança do express
const helmet = require('helmet');

//csrf são tokens para validação de formularios, e nenhum site externo consiguira postar alguma coisa para dentro do nosso site
const csrf = require('csurf');

//Middlewares são funções que são executadas na rota, no meio da rota ou depois que ela tenha terminada
//Podemos criar varios middlewares para diferentes tipos de seguimentos, para fazer diversas funções
const { middlewareGlobal, checkCsrfError, csrfMiddleware } = require('./src/middlewares/middleware')


//Aqui estamos utilizamos o helmet no express
app.use(helmet());

//urlencoded permite que podemos postar formularios para dentro da nossa aplicação
app.use(express.urlencoded({ extended: true }));
//json() permite que podemos postar um parse de json para dentro da nossa aplicação
app.use(express.json());


//express.static são todos os arquivos que são estaticos na nossa aplicação e devem ser acessados diretamente
app.use(express.static(path.resolve(__dirname, 'public')));//<< caminho absoluto da pasta public para conteudos staticos


//Aqui temos uma configuração de sessão
const sessionOptions = session({
  secret: 'iosdinfiosnfssdi',
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, //7 Dias de sessão
    httpOnly: true 
  }
})

//Aqui pedimos para o express usar a configuração de sessão realizada
app.use(sessionOptions);

//Aqui pedimos para o express usar as mensagens flash
app.use(flash());


//Aqui em views são os arquivos que renderizamos na tela
app.set('views', path.resolve(__dirname, 'src', 'views'));//<< aqui está o caminho absoluto da pasta view
app.set('view engine', 'ejs'); //<< setamos essa engina para podermos usar codigo de programacao (for, if, echo...) dentro do html e podermos renderizar a view
//npm i ejs para instalar a dependencia

//Aqui solicitamos que o express use o csrf para configurar os tokens de formulario
app.use(csrf());


//Nossos proprios Middlewares
app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(csrfMiddleware);

//Aqui estamos chamando as rotas
app.use(routes);


//Aqui estamos mandando nossa aplicação "Escutar coisas" e fazermos a inicialização do server
app.on('Pronto', () => {
  app.listen(3000, () => {
    console.log('Acessar http://localhost:3000');
    console.log('Servidor rodando...');
  });
});

