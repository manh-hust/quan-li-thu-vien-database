const sequelize = require('sequelize')
const db = require('../../config/pg_db/index.js')

const Favorite = db.define('favorite', {
    id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    titleID: {
        type: sequelize.STRING,
        allowNull: false,
        field: 'title_id'
    }
},{
    timestamps: false,
    freezeTableName: true,
})
Favorite.sync({ alter: true });
  

module.exports = Favorite
