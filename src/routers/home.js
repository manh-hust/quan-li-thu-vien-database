const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
 

const homeController = require('../app/controllers/HomeController');

router.get('/user/:id', homeController.showOne);
router.get('/user', homeController.showAll);
router.post('/user/create',urlencodedParser, homeController.createUser);
router.get('/', homeController.index)

module.exports = router;
