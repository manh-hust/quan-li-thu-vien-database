
class PrivacyController{
    index(req, res, next){
        const user = res.locals.user
        const authorize = user.authorize
        const dob = user.dob
        const date = `${dob.getFullYear()}-${dob.getMonth()}-${dob.getDate()}`
        let avatar
        if( authorize == 'admin'){
            avatar = 3
        }
        else if( authorize == 'thuthu'){
            avatar = 2
        }
        else{
            avatar = 1
        }
        const fullName = `${user.lastName} ${user.firstName}`
        res.render('privacy/privacy', {
            fullName: fullName,
            avatar,
            dob: date
        })
    }

}
module.exports = new PrivacyController();
