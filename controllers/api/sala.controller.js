var express = require('express');
var router = express.Router();
var salaService = require('services/sala.service');

// routes
router.post('/register', createRoom);
//router.get('/', listPeople);
//router.put('/', updatePerson);
//router.get('/:_id', getCurrentPerson);
//router.delete('/:_id', deletePerson);

module.exports = router;

function createRoom(req, res) {
   // req.body
   req.body.status=0; 
    salaService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}


