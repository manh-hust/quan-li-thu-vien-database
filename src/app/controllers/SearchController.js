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

    detailCategory(req, res, next) {
        const name = req.params.category
        res.render('search/detailCategory',{
            name: name
        })
    }
    async detailID(req, res, next) {
        const bookID = req.params.detailID
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
        res.render('search/detailID',{
            book: {
                name: book.name,
                author: authorName,
                type: type.name
            }
        })
    }
    
}

module.exports = new SearchController();
