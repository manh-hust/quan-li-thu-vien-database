const Users = require('../models/user')

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
                });
                res.redirect('/')
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
    register(req, res, next) {
        res.render('auth/register', {
            layout: 'main1'
        })
    }
    create(req, res, next) {
        const {firstName, lastName, email, password, MSSV} = req.body
        Users.findOne({
            where: {
                email: email
            }
        })
        .then(user => {
            if(user)
            res.render('auth/register',{
                firstName,lastName,email,password,MSSV,
                err: 'Email đã được sử dụng'
            })
            else{
                const id = (Math.floor(Math.random()*1000000)).toString()
                Users.create({
                    userID: id,
                    firstName,
                    lastName,
                    MSSV,
                    email,
                    password,
                })
                .then(user =>{
                    res.redirect('/auth/login')
                })
            }
        })
    }
    logout(req, res, next) {
        res.clearCookie('userID');
        res.redirect('../auth/login');
    }
}

module.exports = new AuthController();
