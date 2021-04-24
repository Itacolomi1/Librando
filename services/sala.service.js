var Q = require('q');
var lodash = require('lodash');
var mongoDB = require('config/database.js');
const ObjectID = mongoDB.ObjectID();
mongoDB.connect();


var service = {};
service.create = create;
//service.getById = getById;
//service.listPeople = listPeople;
//service.update = update;
//service.delete = _delete;

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