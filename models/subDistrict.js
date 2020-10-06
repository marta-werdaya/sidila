const mongoose = require('mongoose');
const Joi = require('joi');
const { ObjectId } = mongoose.Schema;

const subDistrictSchema = mongoose.Schema({
    name: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true,
    },
    villageId: [{
        type: ObjectId,
        ref: 'Village'
    }]
});

const SubDistrict = mongoose.model("SubDistrict", subDistrictSchema);

function validateSubDistrict(subDistrict) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
    }
    return Joi.validate(subDistrict, schema);
}

exports.validate = validateSubDistrict;
exports.SubDistrict = SubDistrict;