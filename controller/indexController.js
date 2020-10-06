const { User } = require('../models/user');
const { Permission } = require('../models/permission');
const bcrypt = require('bcryptjs');

module.exports = {
    //BAGIAN LANSIA
    viewLogin: async (req, res) => {
        if (req.session.user == null || req.session.user == undefined) {
            res.render('index/login', {
                title: 'SIDILA | Login',
            });
        } else {
            if (req.session.user.permissionId == "admin") {
                res.redirect('/admin/dashboard');
            }
            if (req.session.user.permissionId == "user") {
                res.redirect('/user/dashboard');
            }

        }

    },
    viewRegister: async (req, res) => {
        res.render('index/register', {
            title: 'Disabilitas',
            user: 'admin',
        });
    },
    addRegister: async (req, res) => {
        const { name, username, password, email } = req.body;
        await User.create({
            name: name, username: username,
            password: password,
            permissionId: "5f79c65c8c60057ce6f22913",
            email: email
        });
        res.redirect('/index/login');
    },
    actionLogin: async (req, res) => {
        const { username, password } = req.body;
        const user = await User.findOne({ username: username })
            .populate({ path: 'permissionId' });
        if (!user) {
            res.redirect('/index/login');
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            res.redirect('/index/login');
        }
        req.session.user = {
            id: user.id,
            username: user.username,
            permissionId: user.permissionId.name,
        }
        if (req.session.user.permissionId == 'admin') {
            res.redirect('/admin/dashboard');
        } else if (req.session.user.permissionId == 'user') {
            res.redirect('/user/dashboard');
        }
    },
    actionLogout: async (req, res) => {
        req.session.destroy();
        res.redirect('/index/login');
    }
}
        // User.create({
        //     name: "User Sidila",
        //     email: "user@gmail.com",
        //     username: "user Sidila",
        //     password: "rahasia",
        //     permissionId: "5f79c65c8c60057ce6f22913",
        // });