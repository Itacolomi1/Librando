var Q = require('q');
var lodash = require('lodash');
var mongoDB = require('config/database.js');
const ObjectID = mongoDB.ObjectID();
mongoDB.connect();


var service = {};
service.create = create;
service.listJogo1 = listJogo1;

module.exports = service;


function create(jogo1) {
    var deferred = Q.defer();
    var jogo_1 = global.conn.collection("Jogo1");

    jogo_1.insertOne(
        jogo1,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
   

    return deferred.promise;
}

function listJogo1() {
    var deferred = Q.defer();
    var jogo_1 = global.conn.collection("Jogo1");

    jogo_1.find().toArray(function (err, jogo1) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (jogo1) {            
            deferred.resolve(jogo1);
        } else {
            // user not found
            deferred.resolve();
        }
    });
    return deferred.promise;
}



