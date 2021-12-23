const Users = require('../models/user')
const Subjects = require('../models/subjects')
class CategoryController {

    index(req, res, next) {
        Subjects.findAll({
            raw: true
        })
        .then( subjects => {
            res.render('category/category',{
                subjects: subjects
            });
        })            
    }

    detail(req, res, next) {
        const name = req.params.slug
        res.render('category/detail',{
            name: name
        })
    }
    
}

module.exports = new CategoryController();
