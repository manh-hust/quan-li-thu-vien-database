const sequelize = require('sequelize')
const db = require('../../config/pg_db/index.js')

const Author = db.define('', {
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
Author.sync({ alter: true });
  

module.exports = Author
