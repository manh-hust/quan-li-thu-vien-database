const Client = require('../../config/pg_db/client');
const { Op } = require('sequelize');
const Borrow = require("../models/borrow");
const Book = require("../models/book");
const Title = require("../models/title");

class BorrowController {
    // [POST] /borrow/:titleID
    async borrow(req, res, next) {
        try {
            const titleID = req.params.titleID
            const {date, returnDate, bookID} = req.body
            const userID = res.locals.user.userID

            const checkRecord = await Client.query(`select * from borrow_infos 
            where user_id = '${userID}'
            and title_id = '${titleID}'
            and note = 'W'
            `)
         
            if(checkRecord.rows.length > 0){
                res.send('<h1 style="text-align: center;">Bạn đang mượn cuốn này nên không thể mượn tiếp! Vui lòng quay lại.</h1>')
                return
            }

            const maxRecord = await Borrow.findAll({
                raw: true,
                limit: 1,
                order: [
                    ['borrowID', 'DESC']
                ],
                attributes: ['borrowID']
            })
            let maxID 
            if(maxRecord.length < 1){
                maxID = 0
            }
            else{
                maxID = Number(maxRecord[0].borrowID)
            }
            
            const newRecord = await Borrow.create({
                borrowID: pad(maxID+1, 8),
                bookID: bookID,
                userID: userID,
                borrowDate: date,
                returnDate: returnDate,
            })
            res.redirect('back')
        } catch (error) {
            res.send(error.message)
        }
    }
    // [GET] /borrow
    async showALl(req, res, next) {
        try {
            const q = req.query.q
            const userID = res.locals.user.userID
            const query = `select * from borrow_infos
            where user_id = '${userID}'
            and title_name ilike ${ q != false ? `'%${q}%'`: `'%%'`}
            order by borrow_date DESC
            `
            const dateNow = new Date()
            const data = await Client.query(query)
            const borrow = data.rows.map(item => {
                const second = (item.return_date - dateNow)
                const day = Math.floor(second / 3600 / 24 / 1000)
                return{
                    name: item.title_name,
                    date: convertDate(item.borrow_date),
                    returnDate: convertDate(item.return_date),
                    note: short(item.note),
                    day
                }
            })
            res.render('borrow/index',{
                data: borrow,
                state: 'all',
                visibleDate: false
            })
        } catch (error) {
            res.send(error.message)
        }
    }
    // [GET] /borrow/:state
    async showState(req, res, next) {
        const state = req.params.state
        const userID = res.locals.user.userID
        const q = req.query.q
        const query = `select * from borrow_infos
        where user_id = '${userID}'
        and note = '${state}'
        and title_name ilike ${ q ? `'%${q}%'`: `'%%'`}
        order by borrow_date DESC
        `
        const dateNow = new Date()
        const data = await Client.query(query)
        const borrow = data.rows.map(item => {
            const second = (item.return_date - dateNow)
            const day = Math.floor(second / 3600 / 24 / 1000)
            return{
                name: item.title_name,
                date: convertDate(item.borrow_date),
                returnDate: convertDate(item.return_date),
                note: short(item.note),
                day
            }
        })
        // console.log(state == 'B')
        res.render('borrow/index',{
            data: borrow,
            state,
            visibleDate: state == 'B' 
        })

    }
    // [GET] /borrow/manage-borrow/:state
    async manage(req, res, next) {
        try {
            const q = req.query.q
            const state = req.params.state
            const dateNow = new Date()
            const query = `
            select * from borrow_infos
            where note like ${state ? `'${state}'` : '%%'}
            and title_name ilike ${ q ? `'%${q}%'`: `'%%'`}
            order by borrow_date 
            `
            const waitingRedcord = await Client.query(query)
            const data = waitingRedcord.rows.map( item => {
                const days = (item.return_date - dateNow)/24/3600/1000
                return {
                    user_id: item.user_id,
                    user_name: item.user_name,
                    title_id: item.titleID,
                    title_name: item.title_name,
                    book_id: item.book_id,
                    borrow_id: item.borrow_id,
                    title_id: item.title_id,
                    borrow_date: convertDate(item.borrow_date),
                    return_date: convertDate(item.return_date),
                    remaining_days: Math.floor(days),
                    days_late: days >= 0 ? 0 : -Math.floor(days) ,
                    quan_in_lib: item.quan_in_lib
                }
            })
            res.render('borrow/manage',{
                data: data,
                state
            })
        } catch (error) {
            res.send(error.message)
        }
    }
    // [POST] /borrow/manage-borrow/W/:borrowID
    async confirm(req, res, next) {
        try {
            const borrowID = req.params.id
            const editRecord = await Borrow.update({
                note: 'B'
            }, {
                where: {
                   borrowID: borrowID
                }
            })
            const book = await Client.query(
            `select quan_in_lib, title_id from borrow_infos
            where borrow_id = '${borrowID}'
            limit 1;
            `)
            const quantity = book.rows[0].quan_in_lib
            const titleID = book.rows[0].title_id
           
            const newQuantity = await Title.update({
                quantityFt: quantity - 1
            }, {
                where: {
                    titleID: titleID
                }
            })
            res.redirect('back')
        } catch (error) {
            res.send(error.message)
        }
    }
    // [POST] /borrow/manage-borrow/R/:borrowID
    async return(req, res, next) {
        try {
            const borrowID = req.params.id
            const editRecord = await Borrow.update({
                note: 'R'
            }, {
                where: {
                   borrowID: borrowID
                }
            })
            const book = await Client.query(
                `select quan_in_lib, title_id from borrow_infos
                where borrow_id = '${borrowID}'
                limit 1;
                `)
                const quantity = book.rows[0].quan_in_lib
                const titleID = book.rows[0].title_id
               
                const newQuantity = await Title.update({
                    quantityFt: quantity + 1
                }, {
                    where: {
                        titleID: titleID
                    }
                })
            res.redirect('back')
        } catch (error) {
            res.send(`<h1>${error.message}</h1>`)
        }
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
function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }