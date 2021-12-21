const Users = require('../models/user');

module.exports.requireAuth = function(req, res, next){
    console.log(req.signedCookies)
    next()
}