const sequelize = require('sequelize')
const db = require('../../config/pg_db/index.js')

const Customer = db.define('Customers',{
    CustomerID: {
        type: sequelize.STRING,
        primaryKey: true,
        
    },
    Name:{
        type: sequelize.STRING
    },
    Address:{
        type: sequelize.STRING
    },
},  {
    timestamps: false
})

module.exports = Customer


