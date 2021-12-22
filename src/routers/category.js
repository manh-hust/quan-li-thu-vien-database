const express = require('express');
const router = express.Router();

const categoryController = require('../app/controllers/CategoryController');

router.get('/', categoryController.index);

module.exports = router;