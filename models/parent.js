const mongoose = require('mongoose');
const Joi = require('joi');
const { ObjectId } = mongoose.Schema;

const parentSchema = mongoose.Schema({
    name: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true,
    },
    personId: {
        type: ObjectId,
        ref: 'Person'
    }
});

const Parent = mongoose.model("Parent", parentSchema);

function validateDisabilityType(parent) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
    }
    return Joi.validate(parent, schema);
}

exports.validate = validateDisabilityType;
exports.Parent = Parent;