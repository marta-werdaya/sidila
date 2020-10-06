const mongoose = require('mongoose');
const config = require('config');
const winston = require('winston');
mongoose.set('useFindAndModify', false);


module.exports = function () {
    const db = config.get('db');
    mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => winston.info(`connected to ${db}...`));
}