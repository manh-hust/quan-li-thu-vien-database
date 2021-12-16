const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const app = express();
const port = 3000;

const route = require('./routers');
const db = require('./config/pg_db');

route(app);
db.connect();
// Set views engine
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        //helpers: require('./helper/hanldebars'),
    }),
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
// Trả về sữ liệu dạng JSON
app.use(express.json());

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
