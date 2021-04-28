var Q = require('q');
var lodash = require('lodash');
var mongoDB = require('config/database.js');
const ObjectID = mongoDB.ObjectID();
mongoDB.connect();


var service = {};
service.create = create;
service.verifica_sala_ativa = verifica_sala_ativa;
service.valida_codigo = valida_codigo;
service.lista_salas = lista_salas;

module.exports = service;

function create(salaParam) {
    var deferred = Q.defer();
    var room = global.conn.collection("Sala");
    // validation
    room.findOne(
        { roomName: salaParam.roomName },
        function (err, person) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            if (person) {
                // room already exists
                deferred.reject('RoomName "' + salaParam.roomName + '" is already taken');
            } else {
                createRoom();
            }
        });

    function createRoom() {
        room.insertOne(
            salaParam,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function verifica_sala_ativa(roomname){

    var deferred = Q.defer();
    var room = global.conn.collection("Sala");

    room.findOne(
        { roomName: roomname },
        function (err, room) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            if (room) {
                // room already exists
                if(room.status == 0){
                    deferred.resolve(false);
                }else{
                    deferred.resolve(true);
                }
               
            } else {
                deferred.reject('A sala' +roomname + 'não foi encontrada');
            }
        });
    
    return deferred.promise;

}

function valida_codigo(codigo){

    var deferred = Q.defer();
    var room = global.conn.collection("Sala");

    room.findOne(
        { cod_acesso: codigo },
        function (err, room) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            if (room) {
                deferred.resolve(true);                
               
            } else {
                deferred.resolve(false); 
            }
        });
    
    return deferred.promise;

}

function lista_salas() {

    var deferred = Q.defer();
    var room = global.conn.collection("Sala");

    room.find().toArray(function (err, room) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (room) {
            // return user (without hashed password)
            deferred.resolve(room);
        } else {
            // user not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}
