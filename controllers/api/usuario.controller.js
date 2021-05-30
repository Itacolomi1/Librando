// Esse é o mesmo controller do Mongo Stack! Apenas fiz a tradução das mensagens

let express = require('express')
var router = express.Router()
var userService = require('services/usuario.service')

// routes
router.post('/authenticate', authenticateUser)
router.post('/register', registerUser)
router.get('/loginTeste',verifyLogin)

module.exports = router

function authenticateUser (req, res) {
  userService.authenticate(req.body.email, req.body.senha)
    .then(function (response) {
      if (response) {
        // authentication successful
        //localStorage.setItem('token', response.token)
        res.send({ userId: response.userId, token: response.token })                
            } else {
        // authentication failed
        res.status(401).send('Usuário e/ou senha inválidos')
            }
    })
    .catch(function (err) {
      res.status(400).send(err)
        })
}

function registerUser (req, res) {
  userService.create(req.body)
    .then(function (user) {
      res.status(200).send(user)
        })
    .catch(function (err) {
      res.status(400).send(err)
        })
}

 async function verifyLogin(req,res){

  var TestResult = [];
  var email = 'admin@admin.com';
  var senha = '123';

  TestResult[0] = 'Cenário postivo com usuário admin@admin.com e senha 123 retornou: ';
  //caso True
  await userService.authenticate(email,senha)
  .then(function(data){

       TestResult[0] += (data)? 'true' : 'false';        

  })
  .catch(function (err) {
    res.status(400).send(err)
  })

  //caso False
  var email = 'admin@admin.com.br.jdksa';
  var senha = '1232123213';

  TestResult[1] = 'Cenário negativo com usuário admin@admin.com.br.jdksa e senha 1232123213 retornou: ';
  await userService.authenticate(email,senha)
  .then(function(response){ 
    TestResult[1] += (response)? 'true' : 'false'; 
  })
  .catch(function (err) {
    res.status(400).send(err)
  })

  res.send(TestResult);

}
