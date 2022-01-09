const express = require('express');
const router = express.Router();
const manageBookController = require('../app/controllers/ManageBookController');

router.get('/author/:authorID',  manageBookController.authorID);
router.post('/author/:authorID',  manageBookController.editAuthor);
router.post('/author-delete/:authorID',  manageBookController.deleteAuthor);
router.get('/author',  manageBookController.author);
router.post('/author',  manageBookController.createAuthor);

router.get('/publisher/:publisherID',  manageBookController.publisherID);
router.get('/publisher',  manageBookController.publisher);
router.post('/author',  manageBookController.createPublisher);

router.get('/:bookID',  manageBookController.detail);
router.post('/:bookID', manageBookController.create);
router.post('/', manageBookController.search);
router.get('/',  manageBookController.index);


module.exports = router;