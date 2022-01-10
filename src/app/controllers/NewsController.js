const crypto = require("crypto");
const News = require('../models/news')
const { Op } = require('sequelize');

class NewsController {
    // [GET] /news-create
    index(req, res, next){
        res.render('news/index')
    }
    // [POST] /news-create
    create(req, res, next){
        try {
            const {content, title, url} = req.body
            News.create({
                title: title,
                content: content ? content : null,
                url: url ? url : 'https://via.placeholder.com/150/92c952'
            })
            res.redirect('/news')
        } catch (error) {
            res.send(error.message)
        }
    }
}

module.exports = new NewsController();
