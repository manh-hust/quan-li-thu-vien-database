const crypto = require("crypto");
const { Op } = require('sequelize');

class BorrowController {
    // [GET] /borrow/:titleID
    index(req, res, next) {
        res.send(req.body)
    }
}

module.exports = new BorrowController();
