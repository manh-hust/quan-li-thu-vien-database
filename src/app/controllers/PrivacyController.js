const User = require('../models/user')
const Title = require('../models/title')
const { Op } = require('sequelize');


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
    async favorite(req, res, next){
        const userID = res.locals.user.userID
        const user = await User.findByPk(userID,{
            raw: true
        })
        let list = user.favorite 
        let data
        if(list){
            data = await Title.findAll({
                where: {
                    titleID: {
                        [Op.in]: list
                    }
                },
                raw: true
            })
        }
        else{
            data = []
        }
        res.render('privacy/favorite', {
            data
        })
    }
    async postFavorite(req, res, next){
        const userID = res.locals.user.userID
        const titleID = req.params.titleID
        const user = await User.findByPk(userID, {
            raw: true
        })
        let list = user.favorite
        if(list == null) {
            list = []
        }
        else{
             const isInclude = list.includes(titleID)
             if(isInclude){
                 res.redirect('back')
                 return
             }
        }
        list.push(titleID)
        await User.update({
            favorite: list
        }, {
            where: {
                userID: userID
            }
        })
        res.redirect('back')
    }
}
module.exports = new PrivacyController();
