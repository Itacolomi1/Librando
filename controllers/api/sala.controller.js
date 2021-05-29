const express = require('express')
const router = express.Router()
const salaService = require('services/sala.service')

// routes
router.post('/register', createRoom)
router.post('/sala_ativa', verifica_sala)
router.get('/', lista_sala)
router.put('/editarSala', updateSala)
router.post('/createJogador', createNewJogador)
router.get('/valida', valida_codigo)
router.put('/pontuacao', updatePontuacao)
router.get('/jogadores', getJogadores)

// router.delete('/:_id', deletePerson);

module.exports = router

function createRoom (req, res) {
  // req.body
  req.body.status = 0
  req.body.cod_acesso = getRandomInt(1000, 9999)
  salaService.create(req.body)
    .then(function () {
      res.sendStatus(200)
    })
    .catch(function (err) {
      res.status(400).send(err)
    })
}

function getRandomInt (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)

  const codigogerado = Math.floor(Math.random() * (max - min)) + min

  return codigogerado
}

function verifica_sala (req, res) {
  salaService.verifica_sala_ativa(req.body.roomname)
    .then(function (room) {
      res.send(room)
    })
    .catch(function (err) {
      res.sendStatus(400).send(err)
    })
}

function lista_sala (req, res) {
  salaService.lista_salas()
    .then((room) => {
      if (room) {
        res.send(room)
      } else {
        res.sendStatus(400)
      }
    })
    .catch((err) => {
      res.sendStatus(400).send(err)
    })
}

function updateSala (req, res) {
  salaService.update(req.body)
    .then(function () {
      res.sendStatus(200)
    })
    .catch(function (err) {
      res.status(400).send(err)
    })
}
function updatePontuacao (req, res) {
  salaService.updatePontos(req.body._id, req.body.pontos, req.body.id_jogador)
    .then(function () {
      res.sendStatus(200)
    })
    .catch(function (err) {
      res.status(400).send(err)
    })
}
function createNewJogador (req, res) {
  salaService.createJogador(req.body)
    .then(function () {
      res.sendStatus(200)
    })
    .catch(function (err) {
      res.status(400).send(err)
    })
}

function valida_codigo (req, res) {
  let codigo = req.query.code
  codigo = parseInt(codigo)
  salaService.valida_codigo(codigo)
    .then(function (room) {
      res.send(room)
    })
    .catch(function (err) {
      res.sendStatus(400).send(err)
    })
}

function getJogadores (req, res) {
  salaService.getJogadores(req.body)
    .then((room) => {
      if (room) {
        res.send(room)
      } else {
        res.sendStatus(400)
      }
    })
}
