const Subjects = require('../models/subjects')

class SearchController {

    category(req, res, next) {
        Subjects.findAll({
            raw: true
        })
        .then( subjects => {
            res.render('search/category',{
                subjects: subjects,
                title: 'Thể loại sách',
                params: req.params.slug1
            });
        })            
    }
    daiCuong(req, res, next) {
        Subjects.findAll({
            raw: true
        })
        .then( subjects => {
            res.render('search/category',{
                subjects: subjects,
                title: 'Đại cương',
                params: req.params.slug1
            });
        })            
    }
    chuyenNganh(req, res, next) {
        Subjects.findAll({
            raw: true
        })
        .then( subjects => {
            res.render('search/category',{
                subjects: subjects,
                title: 'Chuyên ngành',
                params: req.params.slug1
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
                params: req.params.slug1
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
                title: 'Năm phát hành',
                params: req.params.slug1
            });
        })            
    }
    

    detailCategory(req, res, next) {
        const name = req.params.slug2
        res.render('search/detail',{
            name: name
        })
    }
    
}

module.exports = new SearchController();
