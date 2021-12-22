const express = require('express');
const router = express.Router();

const privacyController = require('../app/controllers/PrivacyController');

router.get('/', authMiddleware.requireAuth, privacyController.index)

module.exports = router;