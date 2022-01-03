const sequelize = require('sequelize')
const db = require('../../config/pg_db/index.js')

const Position = db.define('', {
    positionID: {
        type: sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        field: 'position_id'
    },
    area: {
        type: sequelize.STRING,
        allowNull: false,
        field: 'area'
    },
    shelf: {
        type: sequelize.STRING,
        allowNull: false,
        field: 'shelf'
    }
},{
    timestamps: false,
    freezeTableName: true,
    tableName: 'position'
})
Position.sync({ alter: true });
  

module.exports = Position
