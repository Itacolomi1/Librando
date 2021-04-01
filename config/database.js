
var config = require('config.json');

var services = {}
services.connect = connect;
services.ObjectID = ObjectID;

module.exports = services;


function connect() { 
    var connection = process.env.connectionStringV2 || config.connectionStringV2;
    var database = process.env.databaseV2 || config.databaseV2;
    const mongo = require('mongodb').MongoClient;
    mongo.connect(connection, { useUnifiedTopology: true })
    .then(conn => global.conn = conn.db(database))
    .catch(err => console.log(err));
}

function ObjectID(){
    return require('mongodb').ObjectID;
}