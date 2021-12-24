const express = require('express');
const router = express.Router();
const authMiddleware = require('../app/middleware/auth')

const privacyController = require('../app/controllers/PrivacyController');

router.get('/',  authMiddleware.requireAuth, privacyController.index)

module.exports = router;