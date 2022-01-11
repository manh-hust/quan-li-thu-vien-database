const sequelize = require('sequelize')
const db = require('../../config/pg_db/index.js')
const Title = require('./title')

const Language = db.define('language', {
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
// Language.sync({ alter: true });

Language.hasMany(Title, {foreignKey: 'languageID'})
Title.belongsTo(Language, {foreignKey: 'languageID'})

module.exports = Language
