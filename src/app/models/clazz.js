const sequelize = require('sequelize')
const db = require('../../config/pg_db/index.js')
const Student = require('./student')

const Clazz = db.define('clazz',{
    clazz_id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    name:{
        type: sequelize.STRING
    },
    lecturer_id:{
        type: sequelize.STRING
    },
    monitor_id: {
        type: sequelize.STRING
    },
    number_students: {
        type: sequelize.INTEGER
    }
},  {
    timestamps: false
})

db.sync();

Clazz.hasOne(Student, {foreignKey: 'student_id'})



module.exports = Clazz


