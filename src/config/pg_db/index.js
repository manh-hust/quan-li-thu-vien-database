const {Sequelize} = require('sequelize');

const db = new Sequelize({
    database: 'edudb_v2',
    username: 'postgres',
    password: '744074',
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
});

db.connect = async function(){
    try{
        var database = await db.authenticate()
        console.log("Connect Susscess!")
    }
    catch(err){
        console.error('Not connect');
    }     
}

module.exports = db;