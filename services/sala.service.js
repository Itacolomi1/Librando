const Q = require('q')
const lodash = require('lodash')
const mongoDB = require('config/database.js')
const ObjectID = mongoDB.ObjectID()
mongoDB.connect()

const service = {}
service.create = create
service.verifica_sala_ativa = verifica_sala_ativa
service.valida_codigo = valida_codigo
service.lista_salas = lista_salas
service.update = update
service.createJogador = createJogador
service.updatePontos = updatePontuacao
service.jogadores = jogadores

module.exports = service

function create (salaParam) {
  const deferred = Q.defer()
  const room = global.conn.collection('Sala')
  // validation
  room.findOne(
    { roomName: salaParam.roomName },
    function (err, person) {
      if (err) deferred.reject(err.name + ': ' + err.message)

      if (person) {
        // room already exists
        deferred.reject('RoomName "' + salaParam.roomName + '" is already taken')
      } else {
        createRoom()
      }
    })

  function createRoom () {
    room.insertOne(
      salaParam,
      function (err, doc) {
        if (err) deferred.reject(err.name + ': ' + err.message)

        deferred.resolve()
      })
  }

  return deferred.promise
}

function verifica_sala_ativa (roomname) {
  const deferred = Q.defer()
  const room = global.conn.collection('Sala')

  room.findOne(
    { roomName: roomname },
    function (err, room) {
      if (err) deferred.reject(err.name + ': ' + err.message)

      if (room) {
        // room already exists
        if (room.status == 0) {
          deferred.resolve(false)
        } else {
          deferred.resolve(true)
        }
      } else {
        deferred.reject('A sala ' + roomname + ' não foi encontrada')
      }
    })

  return deferred.promise
}

function valida_codigo (codigo) {
  const deferred = Q.defer()
  const room = global.conn.collection('Sala')

  room.findOne(
    { cod_acesso: codigo },
    function (err, sala) {
      if (err) deferred.reject(err.name + ': ' + err.message)

      if (sala) {
        deferred.resolve(sala)
      } else {
        deferred.resolve(null)
      }
    })

  return deferred.promise
}

function lista_salas () {
  const deferred = Q.defer()
  const room = global.conn.collection('Sala')

  room.find().toArray(function (err, room) {
    if (err) deferred.reject(err.name + ': ' + err.message)

    if (room) {
      // return user (without hashed password)
      deferred.resolve(room)
    } else {
      // user not found
      deferred.resolve()
    }
  })

  return deferred.promise
}

function update (salaParam) {
  const deferred = Q.defer()
  const salas = global.conn.collection('Sala')
  // validation
  salas.findOne({ _id: new ObjectID.createFromHexString(salaParam._id) }, function (err, sala) {
    if (err) deferred.reject(err.name + ': ' + err.message)
    if (sala) {
      updateSala()
    }
  })
  function updateSala () {
    const set = lodash.omit(salaParam, '_id')

    salas.updateOne(
      { _id: new ObjectID.createFromHexString(salaParam._id) },
      { $set: set },
      function (err, doc) {
        if (err) {
          deferred.reject(err.name + ': ' + err.message)
        }

        deferred.resolve()
      })
  }

  return deferred.promise
}

function createJogador (salaParam) {
  const deferred = Q.defer()
  const salas = global.conn.collection('Sala')
  // validation
  salas.findOne({ _id: new ObjectID.createFromHexString(salaParam._id) }, function (err, sala) {
    if (err) deferred.reject(err.name + ': ' + err.message)
    if (sala) {
      createNovoJogador()
    }
  })
  function createNovoJogador () {
    salas.updateOne(
      { _id: new ObjectID.createFromHexString(salaParam._id) },
      {
        $push: {
          jogador: {
            $each: [
              { id_jogador: salaParam.cd_jogador, pontos: 0, personName: salaParam.personName, data: salaParam.data }
            ]
          }
        }
      },
      function (err, doc) {
        if (err) {
          deferred.reject(err.name + ': ' + err.message)
        }

        deferred.resolve()
      })
  }

  return deferred.promise
}

function updatePontuacao (id_sala, pontuacao, id_jogador) {
  const deferred = Q.defer()
  const salas = global.conn.collection('Sala')
  // validation
  salas.findOne({ _id: new ObjectID.createFromHexString(id_sala) }, function (err, sala) {
    if (err) deferred.reject(err.name + ': ' + err.message)
    if (sala) {
      sala.jogador.find(x => x.id_jogador == id_jogador).pontos = pontuacao
      updatePontuacaoSala(sala)
    }
  })
  function updatePontuacaoSala (sala) {
    const set = lodash.omit(sala, '_id')

    salas.updateOne(
      { _id: new ObjectID.createFromHexString(id_sala) },
      { $set: set },
      function (err, doc) {
        if (err) {
          deferred.reject(err.name + ': ' + err.message)
        }

        deferred.resolve()
      })
  }

  return deferred.promise
}

function jogadores (salaParam) {
  const deferred = Q.defer()
  const salas = global.conn.collection('Sala')
  salas.findOne({ _id: new ObjectID.createFromHexString(salaParam._id) }, function (err, sala) {
    if (err) deferred.reject(err.name + ': ' + err.message)

    if (sala) {
      deferred.resolve(sala.jogador)
    } else {
      deferred.resolve()
    }
  })
  return deferred.promise
}
