const router = require('express').Router();
const index = require('../controller/indexController');

router.get('/', function (req, res, next) {
    res.redirect('/index/login')
});
router.get('/login', index.viewLogin);
router.post('/login', index.actionLogin);
router.get('/logout', index.actionLogout);
router.get('/register', index.viewRegister);
router.post('/register', index.addRegister);

module.exports = router;