const sequelize = require('sequelize')
const db = require('../../config/pg_db/index.js')

const Publisher = db.define('', {
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
Publisher.sync({ alter: true });
  

module.exports = Publisher
