const homeRouter = require('./home');
const authRouter = require('./auth')
const manageBookRouter = require('./manage-book')
const privacyRouter = require('./privacy')
const searchRouter = require('./search')
const usersRouter = require('./users')
const authMiddleware = require('../app/middleware/auth');

function route(app) {
    app.use('/auth', authRouter)
    app.use('/search', authMiddleware.requireAuth, searchRouter)
    app.use('/manage-books', authMiddleware.requireAuth, manageBookRouter)
    app.use('/users', authMiddleware.requireAuth, usersRouter)
    app.use('/privacy', privacyRouter)
    app.use('/', authMiddleware.requireAuth,homeRouter);
}

module.exports = route;
