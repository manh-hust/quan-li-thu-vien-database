const Users = require('../models/user')
const Type = require('../models/type')
const Title = require('../models/title')
const { Op } = require('sequelize');


class SearchController {

    category(req, res, next) {
        const title = 'E-Book'
        Title.findAll({
            where: {
                typeID: {
                    [Op.like]: '%EB%'
                }
            },
            raw: true
        })
        .then( data => {
            res.render('search/category',{
                data: data,
                title,
            });
        })
        .catch(next)       
    }
    daiCuong(req, res, next) {
        const title = 'Đại cương'
        Title.findAll({
            where: {
                typeID: {
                    [Op.like]: '%DC%'
                }
            },
            raw: true
        })
        .then( data => {
            res.render('search/category',{
                data: data,
                title,
            });
        })
        .catch(next)            
    }
    chuyenNganh(req, res, next) {
        const title = 'Chuyên ngành'
        Title.findAll({
            where: {
                typeID: {
                    [Op.like]: '%CN%'
                }
            },
            raw: true
        })
        .then( data => {
            res.render('search/category',{
                data: data,
                title,
            });
        })
        .catch(next)        
    }
    author(req, res, next) {
        const title = 'Tác giả'
        Title.findAll({
            where: {
                typeID: {
                    [Op.like]: '%EB%'
                }
            },
            raw: true
        })
        .then( data => {
            res.render('search/category',{
                data: data,
                title,
            });
        })
        .catch(next)  
    }
    year(req, res, next) {
        Type.findAll({
            raw: true
        })
        .then( type => {
            res.render('search/category',{
                type: type,
                title: 'Năm xuất bản',
            });
        })            
    }

    detailCategory(req, res, next) {
        const name = req.params.category
        res.render('search/detailCategory',{
            name: name
        })
    }
    detailID(req, res, next) {
        console.log(req.params.detailID)
        res.render('search/detailID')
    }
    
}

module.exports = new SearchController();
