const sequelize = require('sequelize')
const db = require('../../config/pg_db/index.js')

const Borrow = db.define('borrow', {
    borrowID: {
        type: sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        field: 'borrow_id'
    },
    bookID: {
        type: sequelize.STRING,
        allowNull: false,
        field: 'book_id'
    },
    userID: {
        type: sequelize.STRING,
        allowNull: false,
        field: 'user_id'
    },
    borrowDate: {
        type: sequelize.DATE,
        allowNull: false,
        field: 'borrow_date'
    },
    dueDate: {
        type: sequelize.STRING,
        field: 'due_date',
        defaultValue: '3 tháng'
    },
    returnDate: {
        type: sequelize.DATE,
        field: 'return_date'
    },
    note: {
        type: sequelize.STRING(1),
        field: 'note',
        defaultValue: 'W'
    },
},{
    timestamps: false,
    freezeTableName: true,
    tableName: 'borrow'
})
// Borrow.sync({ alter: true });


module.exports = Borrow
