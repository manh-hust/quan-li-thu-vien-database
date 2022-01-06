const sequelize = require('sequelize')
const db = require('../../config/pg_db/index.js')
const  Title = require('./title')
const Type = db.define('type', {
    typeID: {
        type: sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        field: 'type_id'
    },
    name: {
        type: sequelize.STRING,
        allowNull: false,
        field: 'name'
    }
},{
    timestamps: false,
    freezeTableName: true,
    tableName: 'type'
})
Type.sync({ alter: true });
 
Type.hasMany(Title, {foreignKey: 'typeID'})
Title.belongsTo(Type, {foreignKey: 'typeID'})

module.exports = Type
