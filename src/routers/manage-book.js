const express = require('express');
const router = express.Router();
const manageBookController = require('../app/controllers/ManageBookController');

router.get('/:bookID',  manageBookController.detail);
router.post('/', manageBookController.search);
router.get('/',  manageBookController.index);


module.exports = router;