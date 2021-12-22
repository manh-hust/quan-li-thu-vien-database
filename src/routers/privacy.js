const express = require('express');
const router = express.Router();
const authMiddleware = require('../app/middleware/auth')
const cookieParser = require('cookie-parser');

const privacyController = require('../app/controllers/PrivacyController');

router.get('/',  cookieParser('000000'), authMiddleware.requireAuth, privacyController.index)

module.exports = router;