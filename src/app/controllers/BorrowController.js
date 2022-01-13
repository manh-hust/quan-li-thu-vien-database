const crypto = require("crypto");
const { Op } = require('sequelize');

class BorrowController {
    // [GET] /borrow/:titleID
    index(req, res, next) {
        res.render('borrow/index')
    }
}

module.exports = new BorrowController();
