const Users = require('../models/user')
const Type = require('../models/type')
const Title = require('../models/title')
const { Op } = require('sequelize');
const Author = require('../models/author')
const Language = require('../models/language')
const Position = require('../models/position')
const Publisher = require('../models/publisher')

class SearchController {

    async category(req, res, next) {
        try {
            const types = await Type.findAll({
                raw: true
            })
            const total = await Type.count({
                distinct: true
            })
            res.render('search/category', {
                types,
                title: 'Thể loại',
                total,
                data: types
            })
        } catch (error) {
            res.send(error.message)
        }
    }
    async author(req, res, next) {
        const title = 'Tác giả'
        const data = await Author.findAll({
            raw: true
        })
        const total = await Author.count({
            distinct: true
        })
        res.render('search/category',{
            data: data,
            title,
            total
        });
    }
    async detailAuthor(req, res, next) {
        const authorID = req.params.authorID
        const author = await Author.findByPk(authorID,{
            raw: true
        })
        const name = `${author.lastName} ${author.firstName}`
        const data = await Title.findAll({
            where: {
                authorID: authorID
            },
            raw: true
        })
        const total = await Title.count({
            where: {
                authorID: authorID
            },
            raw: true,
            distinct: true
        })
        res.render('search/detailAuthor',{
            name,
            data,
            total
        })
    }
    async year(req, res, next) {
        const title = 'Năm xuất bản'
        const data = await Type.findAll({
            raw: true
        })
        let total = 0
        res.render('search/category',{
            title,
            data,
            total
        });
    }
    async detailID(req, res, next) {
        const bookID = req.params.detailID
        const userID = res.locals.user.userID
        const user = await Users.findByPk(userID)
        const favorite = user.favorite
        let btnFavorite = false
        if(favorite == null || favorite.includes(bookID) == false){
            btnFavorite = true
        }
        const book = await Title.findByPk(bookID,{
            raw: true,
            include: [Author, Publisher, Position, Language, Type]
        })
        if(!book){
            next();
            return;
        }
        
        // res.send(book)
        // return
        const list = await Title.findAll({
            where: {
                typeID: book.typeID
            },
            raw: true,
            limit: 8
        })
        const news = await Title.findAll({
            raw: true,
            limit: 6
        })
        res.render('search/detailID',{
            book: {
                title: book,
                list,
                news,
                btnFavorite,
                url: book.url
            }
        })
    }
}

module.exports = new SearchController();
