const { user } = require("pg/lib/defaults");

class PrivacyController{
    index(req, res, next){
        const user = res.locals.user
        const fullName = `${user.lastName} ${user.firstName}`
        res.render('privacy/privacy', {
            fullName: fullName
        })
    }

}
module.exports = new PrivacyController();
