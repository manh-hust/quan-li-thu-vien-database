const homeRouter = require('./home');
const authRouter = require('./auth')
const newsRouter = require('./news')
const manageBookRouter = require('./manage-book')
const privacyRouter = require('./privacy')
const searchRouter = require('./search')
const usersRouter = require('./users')
const authMiddleware = require('../app/middleware/auth');

function route(app) {
    app.use('/auth', authRouter)
    app.use('/news-create', authMiddleware.requireAuth, newsRouter)
    app.use('/search', authMiddleware.requireAuth, searchRouter)
    app.use('/manage-books', authMiddleware.requireAuth, manageBookRouter)
    app.use('/users', authMiddleware.requireAuth, usersRouter)
    app.use('/privacy', privacyRouter)
    app.use('/', authMiddleware.requireAuth,homeRouter);
}

module.exports = route;
