const express = require('express');
const router = express.Router();

const AuthController = require('../app/controllers/AuthController');

router.get('/login', AuthController.login);
router.post('/login', AuthController.postLogin)
router.get('/logout', AuthController.logout);
router.get('/register', AuthController.register);
router.post('/update/:userID', AuthController.update);
router.post('/register', AuthController.create);

module.exports = router;