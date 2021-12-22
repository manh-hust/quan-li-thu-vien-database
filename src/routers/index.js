const homeRouter = require('./home');
const authRouter = require('./auth')
const privacyRouter = require('./privacy')

function route(app) {
    app.use('/auth', authRouter)
    app.use('/privacy', privacyRouter)
    app.use('/',homeRouter);
}

module.exports = route;
