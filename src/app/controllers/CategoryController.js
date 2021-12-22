const Users = require('../models/user')
const Subjects = require('../models/subjects')
class CategoryController {

    index(req, res, next) {
        const userID = req.cookies.userID;
        Users.findByPk(userID)
        .then( user => {
            if(user){
                res.locals.user = user.dataValues
            }
            Subjects.findAll({
                raw: true
            })
            .then( subjects => {
                console.log(subjects)
                res.render('category/category',{
                    subjects: subjects
                });
            })            
        })
    }
    
}

module.exports = new CategoryController();
