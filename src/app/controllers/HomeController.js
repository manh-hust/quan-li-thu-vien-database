const Users = require('../models/user')

class HomeController {
    index(req, res, next) {
        const userID = req.cookies.userID;
        Users.findByPk(userID)
        .then( user => {
            if(user){
                res.locals.user = user.dataValues
            }
        res.render('home/home')
    })}
}
module.exports = new HomeController();
