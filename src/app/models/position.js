const sequelize = require('sequelize')
const db = require('../../config/pg_db/index.js')
const Title = require('./title')

const Position = db.define('position', {
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
// Position.sync({ alter: true });
  
Position.hasMany(Title, {foreignKey: 'positionID'})
Title.belongsTo(Position, {foreignKey: 'positionID'})

module.exports = Position
