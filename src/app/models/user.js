const sequelize = require('sequelize')
const db = require('../../config/pg_db/index.js')

const User = db.define('', {
    userID: {
        type: sequelize.STRING,
        allowNull: false,
        primaryKey: true,
    },
    firstName: {
        type: sequelize.STRING
    },
    lastName: {
        type: sequelize.STRING
    },
    email: {
        type: sequelize.STRING
    },
    password: {
        type: sequelize.STRING
    },
    MSSV: {
        type: sequelize.STRING
    },
    SĐT: {
        type: sequelize.STRING
    },
    address: {
        type: sequelize.STRING
    },
    authorize: {
        type: sequelize.STRING,
        defaultValue: 'user'
    }
},{
    timestamps: false,
    freezeTableName: true,
    tableName: 'user'
})
  User.sync({ alter: true });
  

module.exports = User

