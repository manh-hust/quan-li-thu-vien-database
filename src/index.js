const path = require('path');
const express = require('express');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')

const port = process.env.PORT || 3000;
const app = express();

const route = require('./routers');
const db = require('./config/pg_db/index');
const client = require('./config/pg_db/client');

db.connect();
client.connected();
// Set views engine
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        helpers: require('./helper/handlebars'),
    })
    );
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));
    
// Public file tĩnh
app.use(express.static(path.join(__dirname, 'public')));
    
// Lấy body qua method POST
app.use(
    express.urlencoded({
        extended: true,
    }),
);
// Lay du lieu qua JSON
app.use(express.json());

app.use(cookieParser('000000000'));

route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
