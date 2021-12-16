const sequelize = require('sequelize')
const db = require('../../config/pg_db/index.js')

const User = db.define('Users')


module.exports = User

