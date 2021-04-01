var config = require('config.json');
var lodash = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongoDB = require('config/database.js');
const ObjectID = mongoDB.ObjectID();
mongoDB.connect();

var service = {};

service.authenticate = authenticate;
service.create = create;

module.exports = service;

function authenticate(login_user, password) {
    var deferred = Q.defer();
    var users = global.conn.collection("Usuarios");
 
    users.findOne({ login: login_user }, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user && bcrypt.compareSync(password, user.hash)) {
            // authentication successful
            deferred.resolve({token :jwt.sign({ sub: user._id }, config.secret), userId: user._id});
        } else {
            // authentication failed
            deferred.resolve();
        }
    });

    return deferred.promise;
}


function create(userParam) {
    var deferred = Q.defer();

    var users = global.conn.collection("Usuarios");

    users.findOne(
        { login: userParam.login },
        function (err, user) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            if (user) {
                // username already exists
                deferred.reject('Usuário "' + userParam.nome + '" já cadastrado');
            } else {
                createUser();
            }
        });

    function createUser() {
        // set user object to userParam without the cleartext password
        var user = lodash.omit(userParam, 'password');

        // add hashed password to user object
        user.hash = bcrypt.hashSync(userParam.senha, 10);

        users.insertOne(
            user,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve(user);
            });
    }

    return deferred.promise;
}
