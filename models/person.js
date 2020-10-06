const mongoose = require('mongoose');
let DateOnly = require('mongoose-dateonly')(mongoose);
const Joi = require('joi');
const { ObjectId } = mongoose.Schema;

const personSchema = mongoose.Schema({
    name: {
        type: String,
        minlength: 5,
        maxlength: 50,
        // required: true,
    },
    nik: {
        type: Number,
        maxlength: 50,
        // required: true,
    },
    placeOfBirth: {
        type: String,
        maxlength: 50,
        // required: true,
    },
    address: {
        type: String,
        // required: true,
    },
    dateOfBirth: {
        type: DateOnly,
        // required: true,
    },
    enrollmentId: {
        type: ObjectId,
        ref: 'Enrollment'
    },
    proposalId: {
        type: ObjectId,
        ref: 'Proposal'
    },
    lansiaId: {
        type: ObjectId,
        ref: 'Lansia',
        default: null
    },
    disabilityId: {
        type: ObjectId,
        ref: 'Disability',
        default: null
    },
    villageId: {
        type: ObjectId,
        ref: 'Village',
    },
});

const Person = mongoose.model("Person", personSchema);

exports.Person = Person;