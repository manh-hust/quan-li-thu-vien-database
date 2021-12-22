const express = require('express');
const router = express.Router();
const authMiddleware = require('../app/middleware/auth');
const cookieParser = require('cookie-parser');
const homeController = require('../app/controllers/HomeController');

router.get('/home', cookieParser('000000'), authMiddleware.requireAuth, homeController.index)

module.exports = router;
