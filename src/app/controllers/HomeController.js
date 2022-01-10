const Users = require('../models/user')
const Author = require('../models/author')
const Book = require('../models/book')
const Language = require('../models/language')
const Type = require('../models/type')
const Position = require('../models/position')
const Publisher = require('../models/publisher')
const Title = require('../models/title')
const Borrow = require('../models/borrow')
const News = require('../models/news')

const Client = require('../../config/pg_db/client')

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
    tutorial(req, res, next) {
        res.render('home/tutorial');
    }
    async news(req, res, next) {
        try {
            const posts = await News.findAll({
                order: [
                    ['createdAt', 'DESC']
                ],
                raw: true
            })
            const newPosts = posts.map( item => {
                return {
                    newID: item.newID,
                    title: item.title,
                    content: item.content,
                    url: item.url,
                    date: `${item.createdAt.getDate()}/${item.createdAt.getMonth()+1}/${item.createdAt.getFullYear()}`
                }
            })
            res.render('home/news', {
                posts: newPosts
            })
        } catch (error) {
            res.send(error.message)
        }
    }
    async author(req, res, next){
        try {
            const author = await Author.findAll({
                raw: true
            })
            if(author){
                res.send({
                    message: "Success!",
                    data: author
                })
            }
            else{
                res.send('Not found !')
            }
        } catch (error) {
                console.log(error)
                res.send(error.message)            
        }
    }
    async publisher(req, res, next){
        try {
            const publisher = await Publisher.findAll({
                raw: true
            })
            if(publisher){
                res.send({
                    message: "Success!",
                    data: publisher
                })
            }
            else{
                res.send('Not found !')
            }
        } catch (error) {
                console.log(error)
                res.send(error.message)            
        }
    }
    async test(req, res, next){
        const book = await Book.findAll({
            include: [Title],
            raw: true
        })
        res.send(book)
    }
}
module.exports = new HomeController();
