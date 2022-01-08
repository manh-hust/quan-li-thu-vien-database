const { Op } = require('sequelize');
const Title = require('../models/title')
const Author = require('../models/author')
const Client = require('../../config/pg_db/client');
const Type = require('../models/type');
const Language = require('../models/language')
const Position = require('../models/position')
const Publisher = require('../models/publisher');
const crypto = require("crypto");
const { raw } = require('body-parser');


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
            let {bookName, authorName, typeID} = req.body
            typeID = typeID.trim()
            if(typeID == '' && bookName == '' && authorName == '' ){
                res.redirect('back')
                return
            }
            let books = await Title.findAll({
                where: {
                    name: {
                        [Op.like]: bookName ? `%${bookName}%` : '%%'
                    },
                    typeID:  {
                        [Op.like]: typeID ? `%${typeID}%` : '%%'
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
                        // where: {
                        //     typeID: {
                        //         [Op.like]: typeID ? `%${typeID}%` : '%%' 
                        //     }
                        // }
                    }
                ],
                raw: true
            })
            // res.send(books)
            // return
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
        let isAddPage = false
        if(titleID == 'add'){
            isAddPage = true
        }
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
        const positions = await Position.findAll({
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
        res.render('manage-books/detailBook',{
            books,
            types,
            language,
            positions,
            titleID,
            isAddPage
        })
    }
    // POST /manage-books/create
    async create(req, res, next){
        try {
            const{name, type, language, position, quantity, summary, authorID, publisherID} = req.body
            const  titleID = crypto.randomBytes(4).toString('hex');
            // 
            if(authorID != ''){
                const author = await Author.findByPk(authorID,{
                    raw: true
                })
                if(author == null){
                    res.redirect('back')
                    return
                }
            }
            const newTitle = await Title.create({
                titleID,
                name: name,
                typeID: type.trim(),
                languageID: language.trim(),
                positionID: position.trim(),
                quantity,
                authorID: authorID.trim(),
                publisherID: publisherID.trim()
            })
            res.redirect(`/manage-books/${titleID}`)
        } catch (error) {
            res.send(error.message)            
        }
    }
}

module.exports = new ManageBookController();
