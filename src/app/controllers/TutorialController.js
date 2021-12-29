const Users = require('../models/user')

class TutorialController {

    map(req, res, next) {
        res.render('tutorial/map', {
            title: 'BẢN ĐỒ'
        });
    }

}

module.exports = new TutorialController();
