const sequelize = require('sequelize')
const db = require('../../config/pg_db/index.js')

const Book = db.define('', {
    bookID: {
        type: sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        field: 'book_id'
    },
    note: {
        type: sequelize.TEXT,
        field: 'note',
    },
    titleID: {
        type: sequelize.STRING,
        allowNull: false,
        field: 'title_id',
    },
},{
    timestamps: false,
    freezeTableName: true,
    tableName: 'book'
})
Book.sync({ alter: true });
  

module.exports = Book
