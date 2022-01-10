const express = require('express');
const router = express.Router();
const authMiddleware = require('../app/middleware/auth')

const privacyController = require('../app/controllers/PrivacyController');

router.post('/favorite-delete/:titleID',  authMiddleware.requireAuth, privacyController.deleteFavorite)
router.post('/favorite/:titleID',  authMiddleware.requireAuth, privacyController.postFavorite)
router.get('/favorite',  authMiddleware.requireAuth, privacyController.favorite)
router.get('/',  authMiddleware.requireAuth, privacyController.index)

module.exports = router;