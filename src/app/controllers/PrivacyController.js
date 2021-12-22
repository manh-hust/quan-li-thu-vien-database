const { user } = require("pg/lib/defaults");

class PrivacyController{
    index(req, res, next){
        const user = res.locals.user
        res.render('privacy/privacy')
    }

}
module.exports = new PrivacyController();
