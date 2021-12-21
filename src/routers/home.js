const express = require('express');
const router = express.Router();
const authMiddleware = require('../app/middleware/auth');

const homeController = require('../app/controllers/HomeController');

router.get('/home', authMiddleware.requireAuth, homeController.index)

module.exports = router;
