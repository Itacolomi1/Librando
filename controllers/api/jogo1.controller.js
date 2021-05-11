var express = require('express');
var router = express.Router();
var jogo1Service = require('services/jogo1.service');

// routes
router.post('/registra', createJogo1);
router.get('/', listJogo);


module.exports = router;

function createJogo1(req, res) {
    jogo1Service.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function listJogo(req, res) {

    jogo1Service.listJogo1()
            .then(function (jogo1) {
                if (jogo1) {
                    res.send(jogo1);
                } else {
                    res.sendStatus(404);
                }
            })
            .catch(function (err) {
                res.status(400).send(err);
            });
}