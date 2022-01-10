const sequelize = require('sequelize')
const db = require('../../config/pg_db/index.js')
const Title = require('./title')

const Book = db.define('book', {
    bookID: {
        type: sequelize.STRING,
        // autoIncrement: true,
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

Book.belongsTo(Title, {foreignKey: 'titleID'})
Title.hasMany(Book, {foreignKey: 'titleID'})

module.exports = Book
