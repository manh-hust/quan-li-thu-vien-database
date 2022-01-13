const express = require('express');
const router = express.Router();
const homeController = require('../app/controllers/HomeController');
const authMiddleware = require('../app/middleware/auth');

router.get('/test', homeController.test)
router.get('/author', homeController.author)
router.get('/type', homeController.type)
router.get('/publisher', homeController.publisher)
router.get('/tutorial', homeController.tutorial)
router.get('/news', homeController.news)
router.get('/', homeController.index)

module.exports = router;
