const express = require('express');
const router = express.Router();

const searchController = require('../app/controllers/SearchController');

router.get('/category', searchController.category);
router.get('/author', searchController.author);
router.get('/year', searchController.year);
router.get('/:authorID', searchController.detailAuthor);
router.get('/detail/:detailID', searchController.detailID);

module.exports = router;