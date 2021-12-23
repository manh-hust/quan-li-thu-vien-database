const { user } = require("pg/lib/defaults");

class PrivacyController{
    index(req, res, next){
        const user = res.locals.user
        const authorize = user.authorize
        let numberAuthor
        switch(authorize){
            case 'user' :
                numberAuthor = null;
                break;
            case 'thuthu' :
                numberAuthor = 2;
                break;
            case 'admin' :
                numberAuthor = 3;
                break;
        }
        const fullName = `${user.lastName} ${user.firstName}`
        res.render('privacy/privacy', {
            fullName: fullName,
            authorize: numberAuthor

        })
    }

}
module.exports = new PrivacyController();
