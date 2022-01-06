const { Op } = require('sequelize');
const Title = require('../models/title')
const Author = require('../models/author')
const Client = require('../../config/pg_db/client')

class ManageBookController {
    // [GET] /manage
    async index(req, res, next) {
        try {
            const books = await Client.query('select title.name as name, title.quantity, type.name as typename, author.first_name, author.last_name from title, author, type where title.author_id = author.author_id and title.type_id = type.type_id') 
            res.render('manage-books/index',{
                books: books.rows
            })
        } catch (error) {
            res.send(error.message)            
        }
    }
    // POST /manage
    async search(req, res, next){
        try {
            const {bookName, author, category} = req.body
            if(category == '' && bookName == '' && author == '' ){
                res.redirect('back')
                return
            }
            console.log(bookName, author, category)
            // and title.name ilike '%${bookName}%' and author.first_name ilike '%${author}%' 
            const books = await Client.query(`select title.name as name, title.quantity, type.name as typename, author.first_name, author.last_name from title, author, type where title.author_id = author.author_id and title.type_id = type.type_id and title.type_id = '${category}'`)
            res.render('manage-books/index',{
                books: books.rows,
                bookName,
                author,
                category
            })
        } catch (error) {
            res.send(error.message)            
        }
    }
}

module.exports = new ManageBookController();
