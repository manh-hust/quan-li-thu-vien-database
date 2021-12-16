const Users = require('../models/user')
const Customers = require('../models/customer')
const Subject = require('../models/subjects')

class HomeController {
    show(req, res, next) {
        Subject.findAll({
            raw: true,
        })
        .then((users) => {
            Subject.create({
                subject_id: 'IT0101',
                name: 'English For ICT',
                credit: '5',
                percentage_final_exam: '50'
            })
            console.log(users)
            res.json(users);
        })
        .catch(next);
    }
    index(req, res, next) {

    }
}
module.exports = new HomeController();
