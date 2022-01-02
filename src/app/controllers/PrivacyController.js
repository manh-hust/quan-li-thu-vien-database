
class PrivacyController{
    index(req, res, next){
        const user = res.locals.user
        const authorize = user.authorize
        const dob = user.dob
        var stringDate
        if(dob){
            const year = dob.getFullYear()
            const month = `${dob.getMonth() + 1}`.padStart(2, "0")
            const day = `${dob.getDate()}`.padStart(2, "0")
            stringDate = [year, month, day].join("-")
        }
        else{
            stringDate = null
        }
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
            dob: stringDate
        })
    }

}
module.exports = new PrivacyController();
