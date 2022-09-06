const express = require('express')
const dataBase = require('../modules/database.js'); //database interface

const router = express.Router();
// test ID 62cdbb3b08a07c547dca5505

//controllers
const repairsController = require('../controllers/repair')

// @route '/repair'
router.get('/',repairsController.getNewestRepairs)
router.post('/',repairsController.addRepair)
router.get('/search',repairsController.searchRepairs)
router.get('/:id', repairsController.getRepairPage)

module.exports = router;

