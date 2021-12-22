const Users = require('../models/user')
// const Subject =  require ('../models/subjects');

class HomeController {
    index(req, res, next) {
        const user = res.locals.user

        res.render('home/home')
    }
    showAll(req, res, next) {
        Subject.findAll()
        .then( users => {
            res.json({
                Message: 'All-Subject',
                data: users
            })
        })
      
        .catch(next);
    }
    showOne(req, res, next) {
        const id = req.params.id
        Subject.findByPk(id)
        .then(user =>{
            res.json(user)
        })
        .catch(next)
    }
    createUser(req, res, next) {
        const {id, name, credit, percentExam} = req.body
        const credit1 = parseInt(credit)
        const percentExam1 = parseInt(percentExam)

        Subject.create({
            subject_id: id,
            name: name,
            credit: credit1,
            percentage_final_exam: percentExam1
        })
        .then(user => {
            res.redirect('../user')
        })
        .catch(next)
    }   
}
module.exports = new HomeController();
