const mongoose = require('mongoose');
const Joi = require('joi');
const { ObjectId } = mongoose.Schema;

const proposalSchema = mongoose.Schema({
    name: {
        type: String,
        minlength: 5,
        maxlength: 1024,
        required: true,
    },
    personId: {
        type: ObjectId,
        ref: 'Person'
    },
    dateApply: {
        type: Date,
        default: Date.now,
    },
    dateVerification: {
        type: Date,
    },
    status: {
        type: String,
        default: 'Menunggu Konfirmasi',
    },
    penerimaBantuanId: {
        type: ObjectId,
        ref: 'PenerimaBantuan',
        default: null
    },
    reason: {
        type: String,
        default: 'Dalam Tahap Penilaian'
    },

});

const Proposal = mongoose.model("Proposal", proposalSchema);

function validateProposal(proposal) {
    const schema = {
        name: Joi.string().min(5).max(1024).required(),
    }
    return Joi.validate(proposal, schema);
}

exports.validate = validateProposal;
exports.Proposal = Proposal;