var express = require('express');
var router = express.Router();
var salaservice = require('services/sala.service');

// routes
router.post('/registra', createPerson);
router.get('/', listPeople);
router.put('/', updatePerson);
router.get('/:_id', getCurrentPerson);
router.delete('/:_id', deletePerson);

module.exports = router;
