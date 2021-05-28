﻿// Esse é o mesmo controller do Mongo Stack! Apenas fiz a tradução das mensagens

let express = require('express')
var router = express.Router()
var userService = require('services/usuario.service')

// routes
router.post('/authenticate', authenticateUser)
router.post('/register', registerUser)

module.exports = router

function authenticateUser (req, res) {
  userService.authenticate(req.body.email, req.body.senha)
    .then(function (response) {
      if (response) {
        // authentication successful
        localStorage.setItem('token', response.token)
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
