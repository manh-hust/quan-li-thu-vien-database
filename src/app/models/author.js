const sequelize = require('sequelize')
const db = require('../../config/pg_db/index.js')
const Title = require('./title')

const Author = db.define('author', {
    authorID: {
        type: sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        field: 'author_id'
    },
    firstName: {
        type: sequelize.STRING,
        allowNull: false,
        field: 'first_name',
    },
    lastName: {
        type: sequelize.STRING,
        allowNull: false,
        field: 'last_name',
    },
},{
    timestamps: false,
    freezeTableName: true,
    tableName: 'author'
})

// Author.sync({ alter: true });

Author.hasMany(Title, {foreignKey: 'authorID'})
Title.belongsTo(Author, {foreignKey: 'authorID'})

module.exports = Author
