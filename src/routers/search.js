const express = require('express');
const router = express.Router();

const searchController = require('../app/controllers/SearchController');

router.get('/:slug1', searchController.category);
router.get('/:slug1', searchController.daiCuong);
router.get('/:slug1', searchController.chuyenNganh);
router.get('/:slug1', searchController.author);
router.get('/:slug1', searchController.year);
router.get('/:slug1/:slug2', searchController.detailCategory);

module.exports = router;