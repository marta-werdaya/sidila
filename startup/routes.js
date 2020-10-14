const express = require('express');
const index = require('../routes/index');
const admin = require('../routes/admin');
const user = require('../routes/user');
var path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const { jsPDF } = require("jspdf");


module.exports = function (app) {
    app.set('views', path.join(__dirname, '../views'));
    app.set('view engine', 'ejs');

    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        // cookie: { maxAge: 60000000 }
    }));
    app.use('/assets', express.static(path.join(__dirname, '../assets')));
    app.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));
    app.use(express.urlencoded({ extended: false }));
    app.use(methodOverride('_method'));
    app.use('/', index);
    app.use('/index', index);
    app.use('/user', user);
    app.use('/admin', admin);
}