const sequelize = require('sequelize')
const db = require('../../config/pg_db/index.js')

const User = db.define('users', {
    userID: {
        type: sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        field: 'user_id'
    },
    firstName: {
        type: sequelize.STRING,
        field: 'first_name'
    },
    lastName: {
        type: sequelize.STRING,
        field: 'last_name'
    },
    dob: {
        type: sequelize.DATE
    },
    gender: {
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
        type: sequelize.STRING,
        field: 'phone_number'
    },
    address: {
        type: sequelize.STRING
    },
    authorize: {
        type: sequelize.STRING,
        field: 'role',
        defaultValue: 'user'
    },
    favorite: {
        type: sequelize.ARRAY(sequelize.STRING),
    }
},{
    timestamps: false,
    freezeTableName: true,
    tableName: 'users'
})
User.sync({ alter: true });

module.exports = User

