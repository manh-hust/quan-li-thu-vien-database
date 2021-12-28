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

Clazz.belongsTo(Student, {foreignKey: 'monitor_id', as: 'monitor'})
Student.hasOne(Clazz, {foreignKey: 'monitor_id', as: 'monitor'})

Clazz.hasMany(Student, {foreignKey: 'clazz_id', as: 'clazzz', constraints: false})
Student.belongsTo(Clazz, {foreignKey: 'clazz_id', as: 'clazzz', constraints: false})


module.exports = Clazz


