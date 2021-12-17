const Customers = require('../models/customer')
const Subject =  require ('../models/subjects')

class HomeController {
    index(req, res, next) {
        res.render('home')
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
        res.json(req.body)
    }
}
module.exports = new HomeController();
