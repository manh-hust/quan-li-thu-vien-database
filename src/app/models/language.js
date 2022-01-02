const sequelize = require('sequelize')
const db = require('../../config/pg_db/index.js')

const Language = db.define('', {
    languageID: {
        type: sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        field: 'language_id'
    },
    name: {
        type: sequelize.STRING,
        allowNull: false,
        field: 'name'
    }
},{
    timestamps: false,
    freezeTableName: true,
    tableName: 'language'
})
Language.sync({ alter: true });
  

module.exports = Language
