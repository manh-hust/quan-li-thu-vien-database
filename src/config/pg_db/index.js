const {Sequelize} = require('sequelize');

const db = new Sequelize({
    database: 'library',
    username: 'postgres',
    password: '744074',
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    logging: false,
    omitNull: true
});

db.connect = async function(){
    try{
        var database = await db.authenticate()
        console.log("Connect Sever Susscess!")
    }
    catch(err){
        console.error('Not connect Sever ');
    }     
}

module.exports = db;