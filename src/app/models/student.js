const sequelize = require('sequelize')
const db = require('../../config/pg_db/index.js')
const Clazz = require('./clazz')

const Student = db.define('student',{
    student_id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    first_name:{
        type: sequelize.STRING
    },
    last_name:{
        type: sequelize.STRING
    },
    dob: {
        type: sequelize.DATE
    },
    gender: {
        type: sequelize.CHAR
    },
    address: {
        type: sequelize.CHAR
    },
    note: {
        type: sequelize.CHAR
    },
    clazz_id: {
        type: sequelize.STRING
    }
},  {
    timestamps: false
})

db.sync();



module.exports = Student


