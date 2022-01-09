const crypto = require("crypto");
const Users = require('../models/user')
const { Op } = require('sequelize');

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
        Users.findOne({
            where: {
                [Op.or]:[
                    {email: email},
                    {MSSV: MSSV}
                ]
                
            }
        })
        .then(user => {
            if(user)
            res.render('auth/register',{
                firstName,lastName,email,password,MSSV,gender,dob,SĐT,address,password,
                err: 'Email hoặc MSSV đã được sử dụng'
            })
            else{
                const id = crypto.randomBytes(4).toString('hex');
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
                    res.redirect('back')
                })
            }
        })
    }
    // [PUT] /auth/update
     async update(req, res, next) {
        try {
            const {dob, MSSV, SĐT, address, password} = req.body
            const id = req.params.userID
            const user = await Users.findByPk(id)
            user.set({
                dob,
                MSSV,
                SĐT,
                address,
                password
            })
            await user.save();
            res.redirect('back')
        } catch (error) {   
            res.send(error.message)
        }
    }
    // [GET] /auth/logout
    logout(req, res, next) {
        res.clearCookie('userID');
        res.redirect('../auth/login');
    }
}

module.exports = new AuthController();
