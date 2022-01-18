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
     async index(req, res, next) {
         try {
            const userID = req.cookies.userID;
            const user = await Users.findByPk(userID)
            if(user){
                 res.locals.user = user.dataValues
            }
            const  newListBook = await Title.findAll({
                 raw: true,
                 order: [
                    ['titleID', 'DESC']
                ],
                limit: 6,
                offset: 0
            })
            const mostBorrow = await Title.findAll({
                raw: true,
                limit: 6,
                offset: 0,
                order: [
                    ['quantityFt', 'DESC']
                ]
            })
            const queryAuthor = `select * from author where author_id in( 
                select author_id
                 from title t 
                 group by(author_id)
                 order by(count(title_id)) desc
                 limit 6);
            `
            const bestAuthor = await Client.query(queryAuthor)
            const bestBook = await Title.findAll({
                raw: true,
                where: {
                    typeID : '00000004'
                },
                limit: 6,
                offset: 0
            })
             res.render('home/home',{
                 newListBook,
                 mostBorrow,
                 author: bestAuthor.rows,
                 bestBook
             }) 
         } catch (error) {
             res.send(error.message)
         }
    }
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
        const book = await Client.query('select * from title_infos')
        res.send(book.rows)
    }
    async type(req, res, next){
        const book = await Client.query('select * from type')
        res.send(book.rows)
    }
    async title(req, res, next){
        const book = await Client.query('select * from title')
        res.send(book.rows)
    }
}
module.exports = new HomeController();
