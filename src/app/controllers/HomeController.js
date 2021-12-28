const Users = require('../models/user')
const Clazz = require('../models/clazz')
const Student = require('../models/student');
const sequelize = require('sequelize')
const { Op } = require('sequelize');
const { user } = require('pg/lib/defaults');

class HomeController {
    index(req, res, next) {
        const userID = req.cookies.userID;
        Users.findByPk(userID)
        .then( user => {
            if(user){
                res.locals.user = user.dataValues
            }
        res.render('home/home',{
            data: [
            {
                link:'https://thuvienhanoi.org.vn/Upload/2021/10/21/z2865510158945_56054ec033dcddf6d586ab059d3509e6_2021Oct21_044632498.jpg',
                text: 'Thư mục sách mới tháng 11'
            },
            {
                link:'https://thuvienhanoi.org.vn/Upload/2021/10/21/z2865510158945_56054ec033dcddf6d586ab059d3509e6_2021Oct21_044632498.jpg',
                text: 'Thư mục sách mới tháng 11'
            },
            {
                link:'https://thuvienhanoi.org.vn/Upload/2021/10/21/z2865510158945_56054ec033dcddf6d586ab059d3509e6_2021Oct21_044632498.jpg',
                text: 'Thư mục sách mới tháng 11'
            },
            {
                link:'https://thuvienhanoi.org.vn/Upload/2021/10/21/z2865510158945_56054ec033dcddf6d586ab059d3509e6_2021Oct21_044632498.jpg',
                text: 'Thư mục sách mới tháng 11'
            },
            {
                link:'https://thuvienhanoi.org.vn/Upload/2021/10/21/z2865510158945_56054ec033dcddf6d586ab059d3509e6_2021Oct21_044632498.jpg',
                text: 'Thư mục sách mới tháng 11'
            },
            {
                link:'https://thuvienhanoi.org.vn/Upload/2021/10/21/z2865510158945_56054ec033dcddf6d586ab059d3509e6_2021Oct21_044632498.jpg',
                text: 'Thư mục sách mới tháng 11'
            }
        ]
        })
    })}
    test(req, res, next) {
        Clazz.sum('number_students')
        .then(clazz => {
            if(clazz.length < 1){
                res.send({
                    message: 'No data'
                })
            }
            else{
                res.send({
                    message: 'success',
                    data: clazz
                })
            }
        })
    }
}
module.exports = new HomeController();
