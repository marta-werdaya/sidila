const mongoose = require('mongoose');
const Joi = require('joi');
const { ObjectId } = mongoose.Schema;

const permissionSchema = mongoose.Schema({
    name: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true,
    },
    userId: [{
        type: ObjectId,
        ref: 'User'
    }]
});

const Permission = mongoose.model("Permission", permissionSchema);

function validatePermission(permission) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
    }
    return Joi.validate(permission, schema);
}

exports.validate = validatePermission;
exports.Permission = Permission;
