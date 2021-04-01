var express = require('express');
var router = express.Router();
var usuarioService = require('services/jogador.service');

// routes
router.post('/', createPerson);
router.get('/', listPeople);
router.put('/', updatePerson);
router.get('/:_id', getCurrentPerson);
router.delete('/:_id', deletePerson);

module.exports = router;

function createPerson(req, res) {
    usuarioService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function listPeople(req, res) {

        usuarioService.listPeople()
            .then(function (people) {
                if (people) {
                    res.send(people);
                } else {
                    res.sendStatus(404);
                }
            })
            .catch(function (err) {
                res.status(400).send(err);
            });
}

function getCurrentPerson(req, res) {
    var personId = req.params._id;
    usuarioService.getById(personId)
        .then(function (person) {
            if (person) {
                res.send(person);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function updatePerson(req, res) {
    usuarioService.update(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function deletePerson(req, res) {
    var personId = req.params._id;
    usuarioService.delete(personId)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}