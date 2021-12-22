const homeRouter = require('./home');
const authRouter = require('./auth')
const privacyRouter = require('./privacy')
const categoryRouter = require('./category')

const cookieParser = require('cookie-parser');

function route(app) {
    app.use('/auth', authRouter)
    app.use('/category', cookieParser('000000'), categoryRouter)
    app.use('/privacy', privacyRouter)
    app.use('/', cookieParser('000000'), homeRouter);
}

module.exports = route;
