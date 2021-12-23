const { user } = require('pg/lib/defaults');
const Users = require('../models/user')

class UsersController {
    index(req, res, next) {
        Users.findAll({
            raw: true
        })
        .then( users => {
            res.render('users/ListUser', {
                users: users
            })
        })
    }
}

module.exports = new UsersController();
