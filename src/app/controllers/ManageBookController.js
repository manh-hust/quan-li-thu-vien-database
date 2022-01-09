const { Op } = require('sequelize');
const Title = require('../models/title')
const Author = require('../models/author')
const Client = require('../../config/pg_db/client');
const Type = require('../models/type');
const Language = require('../models/language')
const Position = require('../models/position')
const Publisher = require('../models/publisher');
const crypto = require("crypto");


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

    // GET /manage-books/author
    async author(req, res, next) {
        try {
            const authorLast = await Author.findAll({
                raw: true,
                limit: 1,
                offset: 0,
                order: [
                    ['authorID','DESC'] 
                ]
            })
            const authorIDLast = authorLast[0].authorID
            const number = Number(authorIDLast.slice(2))
            const newID = 'AU'+(pad(number+1,6))
            res.render('manage-books/detailAuthor',{
                author: null,
                newID,
                new: true
            })
        } catch (error) {
            res.send(error.message)            
        }
    }
    // POST /manage-books/author
    async createAuthor(req, res, next){
        try {
            const {authorID, firstName, lastName} = req.body
            const checkAuthor = Author.findByPk(authorID,{
                raw: true
            })
            const newAuthor = await Author.create({
                authorID,
                firstName,
                lastName
            })
            res.redirect(`/manage-books/author/${authorID}`)
        } catch (error) {
            res.send(error.message)
        }
    }
    // GET /manage-books/author/:authorID
    async authorID(req, res, next) {
        const authorID = req.params.authorID
        if(!authorID){
            res.redirect('/manage-books/author')
            return
        }
        const author = await Author.findByPk(authorID,{
            raw: true
        })
        if (author) {
            res.render('manage-books/detailAuthor',{
                author: author,
                new: false
            })
        }
        else{
            res.redirect('/manage-books/author') 
        }
    }
    // PUT /manage-books/author/:authorID
    async editAuthor(req, res, next){
        try {
            const authorID = req.params.authorID
            const {lastName, firstName} = req.body
            const author = await Author.findByPk(authorID)
            author.set({
                firstName: firstName,
                lastName: lastName
            })
            await author.save()
            res.redirect('back')
            // res.send(req.body)
        } catch (error) {
            res.send(error.message)
        }
    }
    // DELETE /manage-books/author-delete/:authorID
    async deleteAuthor(req, res, next) {
        try {
            const id = req.params.authorID
            const author = await Author.destroy({
                where: {
                    authorID: id
                }
            })
            res.redirect('/manage-books')
        } catch (error) {
            res.send(error.message)
        }
    }

    // GET /manage-books/publisher
    async publisher(req, res, next) {
        try {
            const publisherLast = await Publisher.findAll({
                raw: true,
                limit: 1,
                order: [
                    ['publisherID','DESC'] 
                ]
            })
            const publisherIDLast = publisherLast[0].publisherID
            const number = Number(publisherIDLast.slice(2))
            const newID = 'PU'+(pad(number+1,6))
            res.render('manage-books/detailPublisher',{
                publisher: null,
                newID,
                new: true
            })
        } catch (error) {
            res.send(error.message)
        }

    }
    async createPublisher(req, res, next) {

    }
    // GET /manage-books/publisher/:publisherID
    async publisherID(req, res, next) {
        const publisherID = req.params.publisherID
        if(!publisherID){
            redirect('back')
            return
        }
        const publisher = await Publisher.findByPk(publisherID,{
            raw: true
        })
        res.render('manage-books/detailPublisher',{
            publisher
        })

    }
}

function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }

module.exports = new ManageBookController();
