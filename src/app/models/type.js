const sequelize = require('sequelize')
const db = require('../../config/pg_db/index.js')

const Type = db.define('', {
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
  

module.exports = Type
