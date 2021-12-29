const Users = require('../models/user')
const { Op } = require('sequelize');

class UsersController {
    index(req, res, next) {
        const q = req.query.q
        if(q){
            Users.findAll({
                where: {
                    authorize: {
                        [Op.like]: `%${q}%`
                    },
                },
                raw: true
            })
            .then( users => {
                res.render('users/ListUser', {
                    users: users,
                    q: q
                })
            })
        }
        else{
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
}

module.exports = new UsersController();
