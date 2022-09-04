// packages
const express = require('express')

//modules
const dataBase = require('../modules/database.js'); //database interface

// create router instance
const router = express.Router();
// test ID 62cdbb3b08a07c547dca5505

//controllers
const repairsController = require('../controllers/repair')

// @route '/repair'
router.get('/',repairsController.getNewestRepairs) //todo
router.post('/',repairsController.addRepair)

router.get('/search',repairsController.searchRepairs)

// router.get('/latest/:num',repairsController.getNewestRepairs)

router.get('/:id', repairsController.getRepair)

module.exports = router;

