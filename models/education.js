const mongoose = require('mongoose');
const Joi = require('joi');
const { ObjectId } = mongoose.Schema;

const educationSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50,
        required: true,
    },
    personId: {
        type: ObjectId,
        ref: 'Person'
    },
});

const Education = mongoose.model("Education", educationSchema);

function validateEducation(education) {
    const schema = {
        name: Joi.string().max(50).required(),
    }
    return Joi.validate(education, schema);
}

exports.validate = validateEducation;
exports.Education = Education;