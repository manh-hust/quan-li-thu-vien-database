const homeRouter = require('./home');
const authRouter = require('./auth')
const privacyRouter = require('./privacy')
const categoryRouter = require('./category')
const usersRouter = require('./users')
const authMiddleware = require('../app/middleware/auth');

const cookieParser = require('cookie-parser');

function route(app) {
    app.use('/auth', authRouter)
    app.use('/category', cookieParser('000000'), authMiddleware.requireAuth, categoryRouter)
    app.use('/users', cookieParser('000000'), authMiddleware.requireAuth, usersRouter)
    app.use('/privacy', privacyRouter)
    app.use('/', cookieParser('000000'), homeRouter);
}

module.exports = route;
