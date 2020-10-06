const isLogin = (req, res, next) => {
    if (req.session.user == null || req.session.user == undefined) {
        res.redirect('/index/login');
    } else {
        next();
    }
}

module.exports = isLogin;