const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const AuthController = require('../app/controllers/AuthController');

router.get('/login', AuthController.login);
router.post('/post', urlencodedParser, AuthController.postLogin)

module.exports = router;