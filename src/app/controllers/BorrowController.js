const Client = require('../../config/pg_db/client');
const { Op } = require('sequelize');
const Borrow = require("../models/borrow");

class BorrowController {
    // [GET] /borrow/:titleID
    async borrow(req, res, next) {
        try {
            const titleID = req.params.titleID
            const {date, returnDate} = req. body
            const userID = res.locals.user.userID
            const checkRecord = await Borrow.findAll({
                where: {
                    [Op.and]: [
                        {bookID: titleID},
                        {userID: userID}
                    ]
                },
                raw: true
            })
            if(checkRecord.length > 0){
                res.redirect('back')
                return
            }
            const newRecord = await Borrow.create({
                bookID: titleID,
                userID: userID,
                borrowDate: date,
                returnDate: returnDate,
            })
            res.redirect('back')
        } catch (error) {
            res.send(error.message)
        }
    }
    async showALl(req, res, next) {
        try {
            const userID = res.locals.user.userID
            const query = `select name, borrow_date, return_date, note from borrow, title 
            where borrow.book_id = title.title_id
            and borrow.user_id = '${userID}'
            order by borrow.borrow_date DESC
            `
            const dateNow = new Date()
            const data = await Client.query(query)
            const borrow = data.rows.map(item => {
                const second = (item.return_date - dateNow)
                const day = Math.floor(second / 3600 / 24 / 1000)
                return{
                    name: item.name,
                    date: convertDate(item.borrow_date),
                    returnDate: convertDate(item.return_date),
                    note: short(item.note),
                    day
                }
            })
            res.render('borrow/index',{
                data: borrow,
                state: 'all'
            })
        } catch (error) {
            res.send(error.message)
        }
    }
    async showState(req, res, next) {
        const state = req.params.state
        const userID = res.locals.user.userID
        const query = `select name, borrow_date, return_date, note from borrow, title 
        where borrow.book_id = title.title_id
        and borrow.user_id = '${userID}'
        and borrow.note = '${state}'
        order by borrow.borrow_date DESC
        `
        const dateNow = new Date()
        const data = await Client.query(query)
        const borrow = data.rows.map(item => {
            const second = (item.return_date - dateNow)
            const day = Math.floor(second / 3600 / 24 / 1000)
            return{
                name: item.name,
                date: convertDate(item.borrow_date),
                returnDate: convertDate(item.return_date),
                note: short(item.note),
                day
            }
        })
        res.render('borrow/index',{
            data: borrow,
            state
        })

    }
}

module.exports = new BorrowController();

function convertDate(date) {
    return `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`
}
function short(state) {
    if(state == 'W')
        return 'Đang chờ'
    else if(state == 'B')
        return 'Đang mượn'
    else if(state = 'R')
        return 'Đã trả'
}