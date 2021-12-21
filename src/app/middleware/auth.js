const Users = require('../models/user');

module.exports.requireAuth = function (req, res, next) {
    console.log(req.signedCookies)
    if (!req.signedCookies) {
        res.redirect('/auth/login');
        console.log('1234')
        return;
    }
    Users.findByPk(req.signedCookies.userId)
    .then(user => {
        if (!user) {
            res.redirect('/auth/login');
            console.log('12345')
            return;
        }
        // Trả về tên người dùng và id qua biến res.locals khi login thành công
        res.locals.nameLogined = user.name.split(' ').slice(-1).join(' ');
        res.locals._id = user._id;
        next();
    })
};