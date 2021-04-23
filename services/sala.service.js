var Q = require('q');
var lodash = require('lodash');
var mongoDB = require('config/database.js');
const ObjectID = mongoDB.ObjectID();
mongoDB.connect();


var service = {};


module.exports = service;