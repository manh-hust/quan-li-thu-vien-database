const express = require('express');
const router = express.Router();

const BorrowController = require('../app/controllers/BorrowController');

router.post('/:titleID', BorrowController.borrow);
router.get('/:state', BorrowController.showState);
router.get('/', BorrowController.showALl);

module.exports = router;