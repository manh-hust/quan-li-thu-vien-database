const { Client } = require('pg/lib')

const client = new Client ({
    database: 'edudb_v2',
    user: 'postgres',
    password: '744074',
    host: 'localhost',
    port: 5432,
 })

 client.connected = async function(){
    try{
        var databaseClient = await client.connect()
        console.log("Connect Client Susscess!")
    }
    catch(err){
        console.error('Not connect Client ');
    }     
}

module.exports = client