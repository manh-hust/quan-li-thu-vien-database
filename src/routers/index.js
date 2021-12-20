const homeRouter = require('./home');
const authRouter = require('./auth')


function route(app) {
    app.use('/auth', authRouter)
    app.use('/', homeRouter);
}

module.exports = route;
