const mongoose = require('mongoose');
const Joi = require('joi');
const { ObjectId } = mongoose.Schema;

const lansiaSchema = mongoose.Schema({
    personId: {
        type: ObjectId,
        ref: 'Person'
    },
    age: {
        type: Number,
        maxlength: 50,
        // required: true,
    },
    year: {
        type: Date,
        default: Date.now,
    },
    imageURL: {
        type: String,

    }
});

const Lansia = mongoose.model("Lansia", lansiaSchema);

function validateLansia(lansia) {
    const schema = {
        // name: Joi.string().min(5).max(50).required(),
    }
    return Joi.validate(lansia, schema);
}

exports.validate = validateLansia;
exports.Lansia = Lansia;