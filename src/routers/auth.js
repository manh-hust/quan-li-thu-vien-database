const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const AuthController = require('../app/controllers/AuthController');

router.get('/login', AuthController.login);
router.post('/login', urlencodedParser, AuthController.postLogin)
router.get('/logout', AuthController.logout);
router.get('/register', AuthController.register);
router.post('/register', urlencodedParser, AuthController.create);

module.exports = router;