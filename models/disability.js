const mongoose = require('mongoose');
const Joi = require('joi');
const { ObjectId } = mongoose.Schema;

const disabilitySchema = mongoose.Schema({
    personId: {
        type: ObjectId,
        ref: 'Person'
    },
    disabilityTypeId: {
        type: ObjectId,
        ref: 'DisabilityType'
    },
    year: {
        type: Date,
        default: Date.now,
    },
    reasonId: {
        type: ObjectId,
        ref: 'Reason'
    },
    educationId: {
        type: ObjectId,
        ref: 'Education'
    },
    parentId: {
        type: ObjectId,
        ref: 'Parent'
    },

});

const Disability = mongoose.model("Disability", disabilitySchema);

function validateDisability(disability) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
    }
    return Joi.validate(disability, schema);
}

exports.validate = validateDisability;
exports.Disability = Disability;