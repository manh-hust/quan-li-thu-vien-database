const homeRouter = require('./home');
const authRouter = require('./auth')
const authMiddleware = require('../app/middleware/auth');

function route(app) {
    app.use('/auth', authRouter)
    app.use('/',homeRouter);
}

module.exports = route;
