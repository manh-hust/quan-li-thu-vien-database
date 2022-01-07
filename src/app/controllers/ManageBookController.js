const { Op } = require('sequelize');
const Title = require('../models/title')
const Author = require('../models/author')
const Client = require('../../config/pg_db/client');
const Type = require('../models/type');
const Language = require('../models/language')
const Position = require('../models/position')
const Publisher = require('../models/publisher');
const { trim } = require('jquery');

class ManageBookController {
    // [GET] /manage
    async index(req, res, next) {
        try {
            const books = await Title.findAll({
                include: [ 
                    {
                        model: Author,
                    },
                    {
                        model: Type,
                    }
                ],
                raw: true
            })
            const types = await Type.findAll({
                raw: true
            })
            res.render('manage-books/index',{
                books,
                types
            })
        } catch (error) {
            res.send(error.message)            
        }
    }
    // POST /manage-books
    async search(req, res, next){
        try {
            const {bookName, authorName, typeID} = req.body
            // console.log(typeID)
            if(typeID == '' && bookName == '' && authorName == '' ){
                res.redirect('back')
                return
            }
            let books = await Title.findAll({
                where: {
                    name: {
                        [Op.like]: bookName ? `%${bookName}%` : '%%'
                    },
                },
                include: [ 
                    {
                        model: Author,
                        where: {
                            [Op.or]: [
                                {
                                    firstName:{
                                        [Op.like]: authorName ? `%${authorName}%` : '%%'
                                    }
                                },
                                {
                                    lastName:{
                                        [Op.like]: authorName ? `%${authorName}%` : '%%'
                                    }
                                },
                            ]
                        }
                    },
                    {
                        model: Type,
                        where: {
                            typeID: {
                                [Op.like]: typeID ? `%${typeID}%` : '%%' 
                            }
                        }
                    }
                ],
                raw: true
            })
            const types = await Type.findAll({
                raw: true
            })
            res.render('manage-books/index',{
                books,
                bookName,
                authorName,
                typeID,
                types
            })
        } catch (error) {
            res.send(error.message)            
        }
    }
    // GET /manage-books/:bookID
    async detail(req, res, next){
        const titleID = req.params.bookID ? req.params.bookID : ''
        if(!titleID){
            res.redirect('back')
            return;
        }
        const types = await Type.findAll({
            raw: true
        })
        const language = await Language.findAll({
            raw: true
        })
        const books = await Title.findByPk(titleID,{
            include: [
                { model: Author, attributes: ['firstName', 'lastName']},
                {model: Type, attributes: ['name']},
                {model: Language, attributes: ['name']},
                {model: Position, attributes: ['area', 'shelf']},
                {model: Publisher, attributes: ['name', 'address']}
            ],
            raw: true
        })
        // res.send(books)
        res.render('manage-books/detailBook',{
            books,
            types,
            language
        })
    }
}

module.exports = new ManageBookController();
