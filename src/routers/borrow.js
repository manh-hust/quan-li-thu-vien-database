const express = require('express');
const router = express.Router();

const BorrowController = require('../app/controllers/BorrowController');

router.get('/borrow-manage', BorrowController.manage);
router.post('/:titleID', BorrowController.borrow);
router.get('/:state', BorrowController.showState);
router.get('/', BorrowController.showALl);

module.exports = router;