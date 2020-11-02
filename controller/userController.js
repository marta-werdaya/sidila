const { Person } = require('../models/person');
const { Village } = require('../models/village');
const { SubDistrict } = require('../models/subDistrict');
const { Lansia } = require('../models/lansia');
const { Proposal } = require('../models/proposal');
const { Disability } = require('../models/disability');
const { Parent } = require('../models/parent');
const { Education } = require('../models/education');
const { Reason } = require('../models/reason');
const { DisabilityType } = require('../models/disabilityType');
const { Enrollment } = require('../models/enrollment');



module.exports = {
    //BAGIAN LANSIA
    viewDashboard: async (req, res) => {
        try {
            if (req.session.user == null || req.session.user == undefined) {
                res.redirect('/index/login');
            } else if (req.session.user.permissionId == "user") {
                const username = req.session.user;
                const disabilities = await Disability.find()
                    .populate({ path: 'personId', populate: { path: 'proposalId' } });
                const lansias = await Lansia.find()
                    .populate({ path: 'personId', populate: { path: 'proposalId' } });
                res.render('user/dashboard/index', {
                    title: 'Dashboard',
                    user: 'user',
                    username,
                    disabilities,
                    lansias,
                });
            } else {
                res.redirect('/admin/dashboard');
            }

        } catch (e) {
            res.redirect('/admin/dashboard');
        }

    },
    viewLansia: async (req, res) => {
        try {
            const username = req.session.user;
            const villages = await Village.find();
            const subDistricts = await SubDistrict.find();
            const lansias = await Lansia.find()
                .populate({ path: 'personId', populate: { path: 'villageId', populate: { path: 'subDistrictId' } } })
                .populate({ path: 'personId', populate: { path: 'proposalId' } })
                .populate({ path: 'personId', populate: { path: 'enrollmentId' } });
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = { message: alertMessage, status: alertStatus };
            res.render('user/lansia/view_lansia', {
                title: 'LANSIA',
                user: 'user',
                alert,
                lansias,
                villages,
                modal: 'view',
                subDistricts,
                username
            });
        } catch (e) {
            res.redirect('/user/lansia');
        }
    },
    addLansia: async (req, res) => {
        try {
            const username = req.session.user;
            const { name, nik, placeOfBirth, dateOfbirth, address, age, villageId, } = req.body;
            // console.log(req.file);
            const person = await Person.create({
                name: name,
                nik: nik,
                placeOfBirth: placeOfBirth,
                dateOfBirth: dateOfbirth,
                address: address,
                villageId: villageId,
            });
            const enrollment = await Enrollment.create({ userId: username.id, personId: person._id });
            const proposal = await Proposal.create({ name: 'Pengajuan Lansia', personId: person._id });
            const lansia = await Lansia.create({ personId: person._id, age: age, imageURL: `images/${req.file.filename}` });
            person.lansiaId = lansia._id;
            person.proposalId = proposal._id;
            person.enrollmentId = enrollment._id;
            await person.save();
            req.flash('alertMessage', 'Berhasil Menambahkan Data');
            req.flash('alertStatus', 'success');
            res.redirect('/user/lansia');
        } catch (e) {
            req.flash('alertMessage', `${e.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/user/lansia');
        }

    },
    editLansia: async (req, res) => {
        try {
            const { id } = req.body;
            console.log(req.body);
            const lansia = await Lansia.findOneAndUpdate({ _id: id, }, { $set: req.body }, { new: true });
            const person = await Person.findOneAndUpdate({ _id: lansia.personId }, { $set: req.body }, { new: true });
            await lansia.save();
            await person.save();
            req.flash('alertMessage', 'Berhasil Mengubah Data');
            req.flash('alertStatus', 'success');
            res.redirect('/user/lansia');
        } catch (e) {
            req.flash('alertMessage', `${e.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/user/lansia');
        }


    },
    deleteLansia: async (req, res) => {
        try {
            const { id } = req.body;
            const lansia = await Lansia.findOne({ _id: id });
            const person = await Person.findOne({ _id: lansia.personId });
            await Proposal.findByIdAndDelete({ _id: person.proposalId });
            await Enrollment.findByIdAndDelete({ _id: person.enrollmentId });
            await lansia.remove();
            await person.remove();
            req.flash('alertMessage', 'Berhasil Menghapus Data');
            req.flash('alertStatus', 'success');
            res.redirect('/user/lansia');
        } catch (e) {
            req.flash('alertMessage', `${e.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/user/lansia');
        }

    },
    //DISABILITAS
    viewDisabilitas: async (req, res) => {
        try {
            const username = req.session.user;
            const villages = await Village.find();
            const educations = await Education.find();
            const reasons = await Reason.find();
            const subDistricts = await SubDistrict.find();
            const disabilityTypes = await DisabilityType.find();
            const disabilities = await Disability.find()
                .populate({ path: 'parentId' })
                .populate({ path: 'educationId' })
                .populate({ path: 'reasonId' })
                .populate({ path: 'disabilityTypeId' })
                .populate({ path: 'personId', populate: { path: 'villageId' } })
                .populate({ path: 'personId', populate: { path: 'enrollmentId' } })
                .populate({ path: 'personId', populate: { path: 'proposalId' } });
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = { message: alertMessage, status: alertStatus };
            res.render('user/disabilities/view_disabilities', {
                title: 'Disabilitas',
                user: 'user',
                villages,
                educations,
                alert,
                reasons,
                disabilityTypes,
                subDistricts,
                disabilities,
                username
            });

        } catch (e) {

        }
    },
    addDisabilitas: async (req, res) => {
        try {
            const username = req.session.user;
            const { name, nik, placeOfBirth, dateOfBirth, address, villageId, educationId, parent, disabilityTypeId, reasonId, proposalName } = req.body;
            const person = await Person.create({
                name: name,
                nik: nik,
                placeOfBirth: placeOfBirth,
                dateOfBirth: dateOfBirth,
                address: address,
                villageId: villageId,
            });
            const disabilitas = await Disability.create({
                personId: person._id,
                disabilityTypeId: disabilityTypeId,
                reasonId: reasonId,
                educationId: educationId,
                imageURL: `images/${req.file.filename}`
            });
            const proposal = await Proposal.create({
                name: proposalName,
                personId: person._id
            });
            const parentName = await Parent.create({
                name: parent,
                personId: person._id
            });
            const enrollment = await Enrollment.create({ userId: username.id, personId: person._id });
            person.proposalId = proposal._id;
            person.disabilityId = disabilitas._id;
            person.enrollmentId = enrollment._id;
            disabilitas.parentId = parentName._id;
            await disabilitas.save();
            await person.save();
            req.flash('alertMessage', 'Berhasil Menambahkan Data');
            req.flash('alertStatus', 'success');
            res.redirect('/user/disabilitas');
        } catch (e) {
            req.flash('alertMessage', `${e.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/user/disabilitas');
        }
    },
    editDisabilitas: async (req, res) => {
        try {
            const { id, parent, proposal } = req.body;
            const disability = await Disability.findOneAndUpdate({ _id: id, }, { $set: req.body }, { new: true });
            const person = await Person.findOneAndUpdate({ _id: disability.personId }, { $set: req.body }, { new: true });
            const newParent = await Parent.findOneAndUpdate({ _id: disability.parentId }, { name: parent }, { new: true });
            const newProposal = await Proposal.findOneAndUpdate({ _id: disability.personId.proposalId }, { name: proposal }, { new: true });
            // const parent = await Parent.findOneAndUpdate({ _id: person.parentId }, { $set: req.body }, { new: true });
            // const reason = await Reason.findOneAndUpdate({ _id: disability.reasonId }, { $set: req.body }, { new: true });
            await disability.save();
            await person.save();
            req.flash('alertMessage', 'Berhasil Mengubah Data');
            req.flash('alertStatus', 'success');
            res.redirect('/user/disabilitas');
        } catch (e) {
            req.flash('alertMessage', `${e.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/user/disabilitas');
        }
    },
    deleteDisabilitas: async (req, res) => {
        try {
            const { id } = req.body;
            const disability = await Disability.findOne({ _id: id });
            const parent = await Parent.findOne({ _id: disability.parentId });
            const person = await Person.findOne({ _id: disability.personId });
            await Proposal.findByIdAndDelete({ _id: person.proposalId });
            await Enrollment.findByIdAndDelete({ _id: person.enrollmentId });
            await parent.remove();
            await person.remove();
            await disability.remove();
            req.flash('alertMessage', 'Berhasil Menghapus Data');
            req.flash('alertStatus', 'success');
            res.redirect('/user/disabilitas');
        } catch (e) {
            req.flash('alertMessage', `${e.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/user/disabilitas');
        }


    },
}
