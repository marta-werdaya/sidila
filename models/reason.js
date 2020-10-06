const mongoose = require('mongoose');
const Joi = require('joi');
const { ObjectId } = mongoose.Schema;

const reasonSchema = mongoose.Schema({
    name: {
        type: String,
        minlength: 5,
    },
    disabilityId: {
        type: ObjectId,
        ref: 'Disability'
    },
});

const Reason = mongoose.model("Reason", reasonSchema);

exports.Reason = Reason;