const express = require('express');
const router = express.Router();

const BorrowController = require('../app/controllers/BorrowController');

router.post('/:titleID', BorrowController.index);


module.exports = router;