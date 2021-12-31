
class PrivacyController{
    index(req, res, next){
        const user = res.locals.user
        const authorize = user.authorize
        const dob = user.dob
        var date
        if(dob){
            const day = dob.getDate()
            if(day < 10){
                date = `${dob.getFullYear()}-${dob.getMonth()+1}-0${dob.getDate()}`
            }
            else{
                date = `${dob.getFullYear()}-${dob.getMonth()+1}-${dob.getDate()}`
                console.log('render: '+ date)
            }
        }
        else{
            date = null
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
            dob: date
        })
    }

}
module.exports = new PrivacyController();
