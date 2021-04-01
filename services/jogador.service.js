var Q = require('q');
var lodash = require('lodash');
var mongoDB = require('config/database.js');
const ObjectID = mongoDB.ObjectID();
mongoDB.connect();


var service = {};
service.create = create;
service.getById = getById;
service.listPeople = listPeople;
service.update = update;
service.delete = _delete;

module.exports = service;


function create(pessoaParam) {
    var deferred = Q.defer();
    var people = global.conn.collection("Jogadores");
    // validation
    people.findOne(
        { personName: pessoaParam.personName },
        function (err, person) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            if (person) {
                // username already exists
                deferred.reject('PersonName "' + pessoaParam.personName + '" is already taken');
            } else {
                createPerson();
            }
        });

    function createPerson() {
        people.insertOne(
            pessoaParam,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function getById(_id) {
    var deferred = Q.defer();
    var people = global.conn.collection("Jogadores");
    people.findOne({ _id: new ObjectID.createFromHexString(_id) }, function (err, person) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (person) {
            // return user (without hashed password)
            deferred.resolve(person);
        } else {
            // user not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}


function listPeople() {
    var deferred = Q.defer();
    var people = global.conn.collection("Jogadores");

    people.find().toArray(function (err, people) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (people) {
            // return user (without hashed password)
            deferred.resolve(people);
        } else {
            // user not found
            deferred.resolve();
        }
    });
    return deferred.promise;
}


function update(personParam) {
    var deferred = Q.defer();
    var people = global.conn.collection("Jogadores");
    // validation
    people.findOne({ _id: new ObjectID.createFromHexString( personParam._id) }, function (err, person) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (person) {
            updatePerson();
        }
    });

    function updatePerson() {
        // fields to update
        var set = lodash.omit(personParam, '_id');

        people.updateOne(
            { _id:new ObjectID.createFromHexString( personParam._id) },
            { $set: set },
            function (err, doc) {
                if (err) {
                    deferred.reject(err.name + ': ' + err.message);
                }

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function _delete(_id) {
    var deferred = Q.defer();
    var people = global.conn.collection("Jogadores");
    people.deleteOne(
        { _id: new ObjectID.createFromHexString(_id) },
        function (err) {
            if (err) {
                deferred.reject(err.name + ': ' + err.message);
            }

            deferred.resolve();
        });

    return deferred.promise;
}

