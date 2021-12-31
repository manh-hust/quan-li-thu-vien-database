const User = require('../models/user');
const Users = require('../models/user')

class AuthController {
    // [GET] /auth/login
    login(req, res, next) {
        res.render('auth/login', {
            layout: 'main1'
        });
    }
    // [POST] /auth/login
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
    // [GET] /auth/register
    register(req, res, next) {
        res.render('auth/register', {
            layout: 'main1'
        })
    }
    // [POST] /auth/register
    create(req, res, next) {
        const {firstName, lastName, email, password, MSSV, SĐT, address, gender, dob} = req.body
        // res.send(req.body)
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
                    SĐT,
                    address,
                    dob,
                    gender
                })
                .then(user =>{
                    res.redirect('/auth/login')
                })
            }
        })
    }
    // [POST] /auth/update
     async update(req, res, next) {
        const {date, MSSV, SĐT, address, password} = req.body
        const id = req.params.userID
        const user = await User.findByPk(id)
        user.set({
            dob: date,
            MSSV,
            SĐT,
            address,
            password
        })
        await user.save();
        res.send('OK !')
    }
    // [GET] /auth/logout
    logout(req, res, next) {
        res.clearCookie('userID');
        res.redirect('../auth/login');
    }
}

module.exports = new AuthController();
