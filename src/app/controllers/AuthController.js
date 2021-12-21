const Users = require('../models/user')
const jwt = require('jsonwebtoken')

class AuthController {
    // [GET] /auth/login
    login(req, res, next) {
        res.render('auth/login', {
            layout: 'main1'
        });
    }
    postLogin(req, res, next){
        const email = req.body.email
        const password = req.body.pass

        Users.findOne({
            where: {
                email: email,
                password: password
            }
        })
        .then( user => {
            if(user){
                res.cookie('userID', user.userID, {
                    signed : true
                });
                res.redirect('/home')
            }
            else{
                res.render('auth/login',
                {
                    layout:'main1',
                    err: 'Tên đăng nhập hoặc mật khẩu không đúng',
                    email,
                    password
                })
            }
        })
        .catch(next)
    }
    logout(req, res, next) {
        res.clearCookie('userId');
        res.redirect('../auth/login');
    }
}

module.exports = new AuthController();
