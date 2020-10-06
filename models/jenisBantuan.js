const mongoose = require('mongoose');
const Joi = require('joi');
const { ObjectId } = mongoose.Schema;

const jenisBantuanSchema = mongoose.Schema({
    name: {
        type: String,
    },
});

const JenisBantuan = mongoose.model("JenisBantuan", jenisBantuanSchema);

exports.JenisBantuan = JenisBantuan;