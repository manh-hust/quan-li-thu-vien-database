const express = require('express');
const router = express.Router();

const searchController = require('../app/controllers/SearchController');

router.get('/category/:typeID', searchController.category);
router.get('/author/:authorID', searchController.detailAuthor);
router.get('/author', searchController.author);
router.get('/year/:slug', searchController.detailYear);
router.get('/year', searchController.year);
router.get('/mostBorrow', searchController.mostBorrow);
router.get('/detail/:detailID', searchController.detailID);

module.exports = router;