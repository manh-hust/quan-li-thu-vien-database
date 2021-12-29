const express = require('express');
const router = express.Router();
const tutorialController = require('../app/controllers/TutorialController');

router.get('/map', tutorialController.map)

module.exports = router;
