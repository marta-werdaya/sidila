const mongoose = require('mongoose');
const Joi = require('joi');
const { ObjectId } = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        minlength: 5,
        maxlength: 50,
        // required: true,
    },
    email: {
        type: String,
        // required: true,
        minlenght: 5,
        maxlength: 50,
        unique: true
    },
    username: {
        type: String
    },
    password: {
        type: String,
        // required: true,
        minlenght: 6,
        maxlength: 1024,
    },
    dateRegistered: {
        type: Date,
        default: Date.now,
    },
    permissionId: {
        type: ObjectId,
        ref: 'Permission'
    },
    enrollmentId: [{
        type: ObjectId,
        ref: 'Enrollment'
    }],

});

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
});

const User = mongoose.model("User", userSchema);

function validateUser(user) {
    const schema = {
        // name: Joi.string().min(5).max(50).required(),
        // email: Joi.string().min(5).max(50).required().email(),
        // password: Joi.string().min(6).max(1024).required(),
    }
    return Joi.validate(user, schema);
}

exports.validate = validateUser;
exports.User = User;

