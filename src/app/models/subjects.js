const sequelize = require('sequelize');
const db = require('../../config/pg_db/index.js')

const Subject = db.define('subject',{
    subject_id: {
        type: sequelize.STRING,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: sequelize.STRING
    },
    credit: {
        type: sequelize.INTEGER
    },
    percentage_final_exam: {
        type: sequelize.INTEGER
    }
},{
    timestamps: false,
    freezeTableName: true
}
)

db.sync();

module.exports = Subject