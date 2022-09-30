const express = require('express')
const dataBase = require('../modules/database.js'); //database interface
const { ensureAuth } = require('../middleware/auth')

const router = express.Router();
// test ID 62cdbb3b08a07c547dca5505

//controllers
const repairsController = require('../controllers/repair')

// @route '/repair'
router.get('/delete/:id',ensureAuth,repairsController.deletePost)
router.get('/testPost',ensureAuth,repairsController.testPost)
router.get('/',ensureAuth,repairsController.getNewestRepairs)
router.post('/',ensureAuth,repairsController.addRepair)
router.get('/search',ensureAuth,repairsController.searchRepairs)////
router.get('/searchpage',ensureAuth,repairsController.getSearchPage)

router.get('/:id',ensureAuth, repairsController.getRepairPage)

module.exports = router;

