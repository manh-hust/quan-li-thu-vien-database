const express = require('express');
const router = express.Router();

const BorrowController = require('../app/controllers/BorrowController');

router.get('/borrow-manage/:state', BorrowController.manage);
router.post('/borrow-manage/W/:id', BorrowController.confirm);
router.post('/borrow-manage/R/:id', BorrowController.return);
router.post('/:titleID', BorrowController.borrow);
router.get('/:state', BorrowController.showState);
router.get('/', BorrowController.showALl);

module.exports = router;