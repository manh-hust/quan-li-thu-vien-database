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
            if(bookName == '' && author =='' && category == ''){
                res.redirect('back')
                return
            }
  
            const books = await Title.findAll({
                where: {
                    name: {
                        [Op.like]: `%${bookName}%`
                    }
                }
            })
            res.render('manage-books/index',{
                books: books.rows
            })
        } catch (error) {
            res.send(error.message)            
        }
    }
}

module.exports = new ManageBookController();
