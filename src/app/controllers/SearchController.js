const Users = require('../models/user')
const Type = require('../models/type')
const Title = require('../models/title')
const { Op } = require('sequelize');
const Author = require('../models/author')
const Language = require('../models/language')
const Position = require('../models/position')
const Publisher = require('../models/publisher')
const Client = require('../../config/pg_db/client');


class SearchController {

    // GET /search/category/:typeID
    async category(req, res, next) {
        try {
            const id = req.params.typeID
            const types = await Type.findAll({
                raw: true,
            })
            const type = await Type.findByPk(id)
            const total = await Type.count({
                distinct: true
            })
            const books = await Title.findAll({
                where: {
                    typeID: id
                },
                raw: true
            })
            res.render('search/category', {
                types,
                title: type.name,
                total: books.length,
                data: books,
                good: id == '00000004',
                category1: id != '00000004'
            })
        } catch (error) {
            res.send(error.message)
        }
    }
    // GET /search/author
    async author(req, res, next) {
        const title = 'Tác giả'
        const data = await Author.findAll({
            raw: true
        })
        const types = await Type.findAll({
            raw: true,
        })
        const total = await Author.count({
            distinct: true
        })
        res.render('search/category',{
            data: data,
            title,
            total,
            types,
            author: true
        });
    }
    // GET /search/author/:authorID
    async detailAuthor(req, res, next) {
        try {
            const authorID = req.params.authorID
            const author = await Author.findByPk(authorID,{
                raw: true
            })
            const name = `${author ? author.lastName : ''} ${author ? author.firstName : ''}`
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
        } catch (error) {
            res.send(error.message)
        }
    }
    async mostBorrow(req, res, nex){
        try {
            const mostBorrow = await Title.findAll({
                raw: true,
                limit: 20,
                offset: 0,
                order: [
                    ['quantityFt', 'DESC']
                ]
            })
            // res.send(mostBorrow)
            // return
            const types = await Type.findAll({
                raw: true,
            })
            res.render('search/category',{
                data: mostBorrow,
                title: 'Mượn nhiều nhất',
                total: 20,
                types,
                mostBorrow: true
            })
        } catch (error) {
            console.log(error)
            res.send(error.message)
        }
    }
    // GET /search/year
    async year(req, res, next) {
        const part1 = await Title.findAll({
            raw: true,
            where: {
                publishDate: {
                    [Op.lt] : '2000'
                }
            },
            limit: 8
        })
        const part2 = await Title.findAll({
            raw: true,
            where: {
                publishDate: {
                    [Op.between] : ['2000', '2009']
                }
            },
            limit: 8
        })
        const part3 = await Title.findAll({
            raw: true,
            where: {
                publishDate: {
                    [Op.between] : ['2010', '2019']
                }
            },
            limit: 8
        })
        const part4 = await Title.findAll({
            raw: true,
            where: {
                publishDate: {
                    [Op.gt] : '2019'
                }
            },
            limit: 8
        })
        res.render('search/year',{
            part1,
            part2,
            part3,
            part4
        });
    // GET /search/year
    }
    // GET /search/year/:slug
    async detailYear(req, res, next){
        const slug = req.params.slug
        let about = {
            above: '0',
            under: '',
            name: ''
        }
        switch(slug){
            case 'part1' :
                about.above =  '1999'
                about.name = 'Trước năm 2000'
                break
            case 'part2' :
                about.above =  '2009'
                about.under = '2000'
                about.name = 'Từ năm 2000 đến năm 2009'
                break
            case 'part3' :
                about.above =  '2019'
                about.under = '2010'
                about.name = 'Từ năm 2010 đến năm 2019'
                break;
            case 'part4' :
                about.under =  '2020'
                about.above = '2029'
                about.name = 'Từ năm 2020 đến nay'
                break;
        }
        const data = await Title.findAll({
            raw: true,
            where: {
                publishDate: {
                    [Op.between] : [about.under, about.above]
                }
            }
        })
        const total = await Title.count({
            raw: true,
            where: {
                publishDate: {
                    [Op.between] : [about.under, about.above]
                }
            }
        })
        res.render('search/detailAuthor',{
            data,
            total,
            name: about.name
        })
    }
    // GET /search/detail/:titleID
    async detailID(req, res, next) {
        try {
            const titleID = req.params.detailID
        const userID = res.locals.user.userID
        const user = await Users.findByPk(userID)
        const favorite = user.favorite
        let btnFavorite = false
        if(favorite == null || favorite.includes(titleID) == false){
            btnFavorite = true
        }
        const book = await Title.findByPk(titleID,{
            raw: true,
            include: [Author, Publisher, Position, Language, Type]
        })
        if(!book){
            next();
            return;
        }
        const list = await Title.findAll({
            where: {
                typeID: book.typeID
            },
            raw: true,
            limit: 8,
            limit: 8
        })
        const news = await Title.findAll({
            raw: true,
            limit: 6,
            order: [
                ['quantity', 'DESC']
            ]
        })

        const query = `select book_id from book 
            where title_id = '${titleID}'
            and book_id not in 
                (select book_id from borrow_infos where title_id = '${titleID}')
            limit 1`
        const bookBorrow = await Client.query(query)
        const bookID = bookBorrow.rows[0].book_id

        let date = new Date()
        let returnDate = new Date()
        returnDate.setMonth(date.getMonth() + 3)
        
        date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        returnDate = `${returnDate.getFullYear()}-${returnDate.getMonth() + 1}-${returnDate.getDate()}`
        res.render('search/detailID',{
            book: {
                title: book,
                list,
                news,
                btnFavorite,
                url: book.url,
                date,
                returnDate
            },
            bookID: bookID
        })
        } catch (error) {
            res.send(error.message)
        }
        
    }
}

module.exports = new SearchController();
