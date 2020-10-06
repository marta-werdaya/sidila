const mongoose = require('mongoose');
const Joi = require('joi');
const { ObjectId } = mongoose.Schema;

const disabilityTypeSchema = mongoose.Schema({
    name: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true,
    },
    disabilityId: {
        type: ObjectId,
        ref: 'Disability'
    }
});

const DisabilityType = mongoose.model("DisabilityType", disabilityTypeSchema);

function validateDisabilityType(disabilityType) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
    }
    return Joi.validate(disabilityType, schema);
}

exports.validate = validateDisabilityType;
exports.DisabilityType = DisabilityType;