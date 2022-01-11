const sequelize = require('sequelize')
const db = require('../../config/pg_db/index.js')
const Title = require('./title')

const Publisher = db.define('publisher', {
    publisherID: {
        type: sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        field: 'publisher_id'
    },
    name: {
        type: sequelize.STRING,
        allowNull: false,
        field: 'name'
    },
    address: {
        type: sequelize.STRING,
        field: 'address'
    }
},{
    timestamps: false,
    freezeTableName: true,
    tableName: 'publisher'
})
// Publisher.sync({ alter: true });

Publisher.hasMany(Title, {foreignKey: 'publisherID'})
Title.belongsTo(Publisher, {foreignKey: 'publisherID'})  

module.exports = Publisher
