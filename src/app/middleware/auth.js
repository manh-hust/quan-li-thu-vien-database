const Users = require('../models/user');

module.exports.requireAuth = function(req, res, next){
    const userID = req.cookies.userID;
    if(!userID){
        res.redirect('/auth/login');
        return;
    }
    Users.findByPk(userID)
    .then( user => {
        if(!user){
           res.redirect('/auth/login');
           return;
        }
        res.locals.user = user.dataValues
        next()
    })
    
}