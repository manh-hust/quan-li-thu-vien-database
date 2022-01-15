const Users = require('../models/user');

module.exports.requireAuth = function(req, res, next){
    const userID = req.cookies.userID;
    let path
    if(req._parsedOriginalUrl){
        path = req._parsedOriginalUrl.path
    }
    if(!userID){
        if(path == '/' || path == '/news' || path == '/tutorial'){
            next()
            return;
        }
        else{
            res.redirect('/auth/login');
            return;
        }
    }
    Users.findByPk(userID)
    .then( user => {
        if(!user){
           res.redirect('/auth/login');
           return;
        }
        const authorize = user.dataValues.authorize
        if(authorize == 'admin'){
            res.locals.admin = true
            res.locals.thuthu = false
            res.locals.userSV = false
        }
        else if (authorize == 'user'){
            res.locals.admin = false
            res.locals.thuthu = false
            res.locals.userSV = true
        }
        else if (authorize == 'thuthu'){
            res.locals.admin = false
            res.locals.thuthu = true
            res.locals.userSV = false
        }
        res.locals.logined = true
        res.locals.user = user.dataValues
        next()
    })
    
}