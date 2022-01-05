const sequelize = require('sequelize')
const db = require('../../config/pg_db/index.js')
const Author = require('./author.js')

const Title = db.define('', {
    titleID: {
        type: sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        field: 'title_id'
    },
    name: {
        type: sequelize.STRING,
        allowNull: false,
        field: 'name'
    },
    quantity: {
        type: sequelize.INTEGER,
        field: 'quantity'
    },
    publishDate: {
        type: sequelize.DATE,
        field: 'publish_date'
    },
    summary: {
        type: sequelize.TEXT,
        field: 'summary'
    },
    authorID: {
        type: sequelize.STRING,
        field: 'author_id',
    },
    publisherID: {
        type: sequelize.STRING,
        field: 'publisher_id'
    },
    languageID: {
        type: sequelize.STRING,
        field: 'language_id'
    },
    positionID: {
        type: sequelize.STRING,
        field: 'position_id'
    },
    typeID: {
        type: sequelize.STRING,
        field: 'type_id'
    },
    url: {
        type: sequelize.STRING,
        field: 'url'
    }
},{
    timestamps: false,
    freezeTableName: true,
    tableName: 'title'
})

Title.sync({ alter: true });


module.exports = Title
