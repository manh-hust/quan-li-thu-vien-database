const Subjects = require('../models/subjects')
const Users = require('../models/user')


class SearchController {

    category(req, res, next) {
        const title = 'Thể loại'
        Subjects.findAll({
            raw: true
        })
        .then( subjects => {
            res.render('search/category',{
                subjects: subjects,
                title,
            });
        })            
    }
    daiCuong(req, res, next) {
        const title = 'Đại cương'
        Subjects.findAll({
            raw: true
        })
        .then( subjects => {
            res.render('search/category',{
                subjects: subjects,
                title,
            });
        })
        .catch(next)            
    }
    chuyenNganh(req, res, next) {
        Subjects.findAll({
            raw: true
        })
        .then( subjects => {
            res.render('search/category',{
                subjects: subjects,
                title: 'Chuyên ngành',
            });
        })            
    }
    author(req, res, next) {
        Subjects.findAll({
            raw: true
        })
        .then( subjects => {
            res.render('search/category',{
                subjects: subjects,
                title: 'Tác giả',
            });
        })            
    }
    year(req, res, next) {
        Subjects.findAll({
            raw: true
        })
        .then( subjects => {
            res.render('search/category',{
                subjects: subjects,
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
