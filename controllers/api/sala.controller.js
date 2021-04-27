var express = require('express');
var router = express.Router();
var salaService = require('services/sala.service');

// routes
router.post('/register', createRoom);
router.post('/sala_ativa', verifica_sala);
//router.put('/', updatePerson);
//router.get('/:_id', getCurrentPerson);
//router.delete('/:_id', deletePerson);

module.exports = router;

function createRoom(req, res) {
   // req.body
   req.body.status=0; 
   req.body.cod_acesso= getRandomInt(1000,9999);
    salaService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);    
    
    var  codigogerado = Math.floor(Math.random() * (max - min)) + min;
    //Precisamos entender melhor esse budega de Javascript.
   /* salaService.valida_codigo(codigogerado)
        .then(function(room){
           if(room == true){
            getRandomInt(1000,9999)
           }
           
        })
        .catch(function(err){
            res.sendStatus(400).send(err);
        })    
        */

        return codigogerado;
    
  }

function verifica_sala(req,res){

    salaService.verifica_sala_ativa(req.body.roomname)
    .then(function(room){
        res.send(room);
    })
    .catch(function(err){
        res.sendStatus(400).send(err);
    })


}


