const mongoose = require('mongoose');
const Joi = require('joi');
const { ObjectId } = mongoose.Schema;

const penerimaBantuanSchema = mongoose.Schema({
    proposalId: {
        type: ObjectId,
        ref: 'Proposal'
    },
    receiptDate: {
        type: Date,
        default: Date.now,
    },
});

const PenerimaBantuan = mongoose.model("PenerimaBantuan", penerimaBantuanSchema);

exports.PenerimaBantuan = PenerimaBantuan;