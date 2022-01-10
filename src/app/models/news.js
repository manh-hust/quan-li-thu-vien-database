const sequelize = require('sequelize')
const db = require('../../config/pg_db/index.js')

const News = db.define('news', {
    newID: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        field: 'new_id'
    },
    title: {
        type: sequelize.STRING,
        allowNull: false,
        field: 'title'
    },
    content: {
        type: sequelize.TEXT,
        field: 'content'
    },
    url: {
        type: sequelize.STRING,
        field: 'url'
    }
    
},{
        freezeTableName: true,
        tableName: 'news'
})

News.sync({ alter: true });
module.exports = News
