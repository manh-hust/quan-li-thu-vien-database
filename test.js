const { Client } = require('pg/lib')
const { user } = require('pg/lib/defaults')

 const client = new Client ({
    database: 'edudb_v2',
    user: 'postgres',
    password: '744074',
    host: 'localhost',
    port: 5432,
 })

client.connect()
    .then(() => console.log('connected'))
    .catch(err => console.error('connection error', err.stack))

 client.query('select * from teaching, subject where teaching.subject_id = subject.subject_id')
    .then( users => {
        console.log(users.rows)
    })
    .catch(e => console.error(e.stack))
    .then(() => client.end())