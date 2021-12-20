const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
 

const homeController = require('../app/controllers/HomeController');

router.get('/', homeController.index)

module.exports = router;
