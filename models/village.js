const mongoose = require('mongoose');
const Joi = require('joi');
const { ObjectId } = mongoose.Schema;

const villageSchema = mongoose.Schema({
    name: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true,
    },
    subDistrictId: {
        type: ObjectId,
        ref: 'SubDistrict'
    },
    personId: {
        type: ObjectId,
        ref: 'Person'
    }
});

const Village = mongoose.model("Village", villageSchema);

function validateVilage(village) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        subDistrictId: Joi.required(),
    }
    return Joi.validate(village, schema);
}

exports.validate = validateVilage;
exports.Village = Village;