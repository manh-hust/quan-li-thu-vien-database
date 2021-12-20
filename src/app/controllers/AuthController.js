

class AuthController {
    // [GET] /auth/login
    login(req, res, next) {
        res.render('auth/login', {
            layout: 'main1'
        });
    }
    postLogin(req, res, next){
        res.redirect('/')
    }
}

module.exports = new AuthController();
