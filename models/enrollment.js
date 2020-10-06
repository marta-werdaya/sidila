const mongoose = require('mongoose');
const Joi = require('joi');
const { ObjectId } = mongoose.Schema;

const enrollmentSchema = mongoose.Schema({
    userId: {
        type: ObjectId,
        ref: 'User'
    },
    personId: {
        type: ObjectId,
        ref: 'Person'
    },
    dateEnrolled: {
        type: Date,
        default: Date.now,
    },
});

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);

exports.Enrollment = Enrollment;