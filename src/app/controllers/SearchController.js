const Users = require('../models/user')
const Type = require('../models/type')
const Title = require('../models/title')
const { Op } = require('sequelize');
const Author = require('../models/author')

class SearchController {

    async ebooks(req, res, next) {
        const title = 'E-Book'
        const data = await  Title.findAll({
            where: {
                typeID: {
                    [Op.like]: '%EB%'
                }
            },
            raw: true
        })
        const total = await Title.count({
            where: {
                typeID: {
                    [Op.like]: '%EB%'
                }
            },
            distinct: true
        })
        res.render('search/category',{
            data: data,
            title,
            total
        });
    }
    async daiCuong(req, res, next) {
        const title = 'Đại cương'
        const data = await Title.findAll({
            where: {
                typeID: {
                    [Op.like]: '%DC%'
                }
            },
            raw: true
        })
        const total = await Title.count({
            where: {
                typeID: {
                    [Op.like]: '%DC%'
                }
            },
            distinct: true
        })
        res.render('search/category',{
            data: data,
            title,
            total
        })
    }
    async chuyenNganh(req, res, next) {
        const title = 'Chuyên ngành'
        const data = await Title.findAll({
            where: {
                typeID: {
                    [Op.like]: '%CN%'
                }
            },
            raw: true
        })
        const total = await Title.count({
            where: {
                typeID: {
                    [Op.like]: '%CN%'
                }
            },
            distinct: true
        })
        res.render('search/category',{
            data: data,
            title,
            total
        })
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
    async year(req, res, next) {
        const title = 'Năm xuất bản'
        const data = await Type.findAll({
            raw: true
        })
        res.render('search/category',{
            title,
            data,
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
            raw: true
        })
        if(!book){
            next();
            return;
        }
        const author = await Author.findByPk(book.authorID,{
            raw: true
        })
        const authorName = `${author.lastName} ${author.firstName}`
        const type = await Type.findByPk(book.typeID,{
            raw: true
        })
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
                titleID: book.titleID,
                name: book.name,
                author: authorName,
                type: type.name,
                list,
                news,
                btnFavorite,
                url: book.url
            }
        })
    }
}

module.exports = new SearchController();
