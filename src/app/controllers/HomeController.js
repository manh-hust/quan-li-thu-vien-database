const Customers = require('../models/customer')
const Subject =  require ('../models/subjects')

class HomeController {
    show(req, res, next) {
        Subject.findAll(
       )
        .then( users => {
            res.json({
                Message: 'Success',
                data: users
            })
        })
      
        .catch(next);
    }
    index(req, res, next) {

    }
}
module.exports = new HomeController();
