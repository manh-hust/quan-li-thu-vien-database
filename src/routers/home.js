const express = require('express');
const router = express.Router();
const homeController = require('../app/controllers/HomeController');
const authMiddleware = require('../app/middleware/auth');

router.get('/tutorial', homeController.tutorial)
router.get('/news', homeController.news)
router.get('/', homeController.index)

module.exports = router;
