const { user } = require("pg/lib/defaults");

class PrivacyController{
    index(req, res, next){
        const user = res.locals.user
        const authorize = user.authorize
        let isUser, isThuthu, isAdmin
        switch(authorize){
            case 'user' :
                isUser = true;
                break;
            case 'thuthu' :
                isThuthu: true;
                break;
            case 'admin' :
                isAdmin = true;
                break;
        }
        const fullName = `${user.lastName} ${user.firstName}`
        res.render('privacy/privacy', {
            fullName: fullName,
            isUser,
            isAdmin,
            isThuthu 

        })
    }

}
module.exports = new PrivacyController();
