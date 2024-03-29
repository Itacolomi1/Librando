// Exemplificação dos comandos git
// biblioteca js que faz o mapeamento das pastas em função do server.js
require('rootpath')(); 
// Inicialização do express. 
var express = require('express');
// essa biblioteca será utilizada na API para fazer autenticaçao seguindo o método JWT. 
// Se quiser estudar um pouco mais sobre JWT, pesquise aqui
// https://jwt.io/introduction/
var expressJwt = require('express-jwt');
var config = require("./config.json");
var cors = require('cors');


// Criação da API e indicação que trabalha com JSON
var api = express();
api.use(cors());
api.use(express.urlencoded());
api.use(express.json());


// Essa configuração na API indica que haverá JWT para cada endpoint / rota método, com exceção dos métodos
// de autenticação, registro de usuários e sobre. Essa camada de segurança é muito boa, porque ajuda
// na diminuição do tratamento de mensagens indevidas na aplicação
api.use('/api', expressJwt({ secret: process.env.secret || config.secret }).unless({ path: ['/api/usuario/authenticate', '/api/usuario/register','/api/jogador/registra','/api/sala/register','/api/jogo1', '/api/sala/valida','/api/sala/createJogador', '/api/sala/pontuacao', '/api/usuario/loginTeste', '/api/sala/testeSala', '/api/sala/sala_ativa' ] }));
api.use('/api/jogador', require('./controllers/api/jogador.controller'));
api.use('/api/usuario',require('./controllers/api/usuario.controller'));
api.use('/api/sala',require('./controllers/api/sala.controller'));
api.use('/api/jogo1', require('./controllers/api/jogo1.controller'));
// process.env.PORT é uma variável injetada pelo Azure Web App. Caso ela não exista, será utilizada a porta fixa (6000)
var apiPort = process.env.PORT || config.port;


// start server API
var serverAPI = api.listen(apiPort, function () {
    console.log('Server API listening at http://' + serverAPI.address().address + ':' + serverAPI.address().port);
});

console.log('Application started');
