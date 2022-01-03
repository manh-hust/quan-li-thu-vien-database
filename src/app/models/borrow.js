const sequelize = require('sequelize')
const db = require('../../config/pg_db/index.js')

const Borrow = db.define('', {
    bookID: {
        type: sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        field: 'book_id'
    },
    userID: {
        type: sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        field: 'user_id'
    },
    borrowDate: {
        type: sequelize.DATE,
        allowNull: false,
        field: 'borrow_date'
    },
    dueDate: {
        type: sequelize.STRING,
        field: 'due_date'
    },
    returnDate: {
        type: sequelize.DATE,
        field: 'return_date'
    },
    note: {
        type: sequelize.STRING,
        field: 'note'
    },
},{
    timestamps: false,
    freezeTableName: true,
    tableName: 'borrow'
})
Borrow.sync({ alter: true });
  

module.exports = Borrow