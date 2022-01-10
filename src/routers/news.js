const express = require('express');
const router = express.Router();

const NewsController = require('../app/controllers/NewsController');

router.post('/', NewsController.create);
router.get('/', NewsController.index);

module.exports = router;