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
const { JenisBantuan } = require('../models/jenisBantuan');

module.exports = {
    //BAGIAN LANSIA
    viewDashboard: async (req, res) => {
        if (req.session.user == null || req.session.user == undefined) {
            res.redirect('/index/login');
        } else if (req.session.user.permissionId == "admin") {
            const username = req.session.user;
            const disabilities = await Disability.find()
                .populate({ path: 'personId', populate: { path: 'proposalId' } });
            const lansias = await Lansia.find()
                .populate({ path: 'personId', populate: { path: 'proposalId' } });
            res.render('admin/dashboard/index', {
                title: 'Dashboard',
                user: 'admin',
                username,
                disabilities,
                lansias,
            });
        } else {
            res.redirect('/user/dashboard');
        }

    },
    //BAGIAN LANSIA
    viewLansia: async (req, res) => {
        const username = req.session.user;
        const lansias = await Lansia.find()
            .populate({ path: 'personId', populate: { path: 'villageId' } })
            .populate({ path: 'personId', populate: { path: 'proposalId' } });
        res.render('admin/lansia/view_lansia', {
            title: 'LANSIA',
            user: 'admin',
            lansias,
            username
        });
    },
    validasiLansia: async (req, res) => {
        const { id } = req.params;
        const proposal = await Proposal.findOne({ _id: id });
        proposal.status = "Diterima";
        proposal.reason = "Telah Memenuhi syarat";
        await proposal.save();
        res.redirect('/admin/lansia');
    },
    rejectLansia: async (req, res) => {
        const { id, reason } = req.body;
        console.log(reason);
        const keterangan = "belum memenuhi kriteria";
        const proposal = await Proposal.findOne({ _id: id });
        proposal.status = "Ditolak";
        proposal.reason = (reason == null || reason == undefined) ? keterangan : reason;
        await proposal.save();
        res.redirect('/admin/lansia');
    },
    //BAGIAN DISABILITAS
    viewDisabilitas: async (req, res) => {
        const username = req.session.user;
        const disabilities = await Disability.find()
            .populate({ path: 'parentId' })
            .populate({ path: 'educationId' })
            .populate({ path: 'reasonId' })
            .populate({ path: 'disabilityTypeId' })
            .populate({ path: 'personId', populate: { path: 'villageId' } })
            .populate({ path: 'personId', populate: { path: 'proposalId' } });
        res.render('admin/disabilities/view_disabilities', {
            title: 'Disabilitas',
            user: 'admin',
            disabilities,
            username,
        });
    },
    validasiDisabilitas: async (req, res) => {
        const { id } = req.params;
        const proposal = await Proposal.findOne({ _id: id });
        proposal.status = "Diterima";
        proposal.reason = "Telah Memenuhi syarat";
        await proposal.save();
        res.redirect('/admin/disabilitas');
    },
    rejectDisabilitas: async (req, res) => {
        const { id, reason } = req.body;
        const keterangan = "belum memenuhi kriteria";
        const proposal = await Proposal.findOne({ _id: id });
        proposal.status = "Ditolak";
        proposal.reason = (reason == null || reason == undefined) ? keterangan : reason;
        await proposal.save();
        res.redirect('/admin/disabilitas');
    },
    //BAGIAN TIPE DISABILITAS
    viewDisabilityType: async (req, res) => {
        const username = req.session.user;
        const disability = await DisabilityType.find();
        res.render('admin/disabilityType/view_disabilityType', {
            title: 'Disabilitas',
            user: 'admin',
            disability,
            username
        });
    },
    addDisabilityType: async (req, res) => {
        const { name } = req.body;
        await DisabilityType.create({ name: name });
        res.redirect('/admin/disability-type');

    },
    editDisabilityType: async (req, res) => {
        const { id, name } = req.body;
        const disability = await DisabilityType.findOne({ _id: id });
        disability.name = name;
        disability.save();
        res.redirect('/admin/disability-type');

    },
    deleteDisabilityType: async (req, res) => {
        const { id } = req.body;
        await DisabilityType.findByIdAndDelete({ _id: id });
        res.redirect('/admin/disability-type');

    },
    //BAGIAN PENYEBAB DISABILITAS
    viewReason: async (req, res) => {
        const username = req.session.user;
        const reasons = await Reason.find();
        res.render('admin/reason/view_reason', {
            title: 'Disabilitas',
            user: 'admin',
            reasons,
            username
        });
    },
    addReason: async (req, res) => {
        const { name } = req.body;
        await Reason.create({ name: name });
        res.redirect('/admin/reason');
    },
    editReason: async (req, res) => {
        const { id, name } = req.body;
        const reason = await Reason.findOne({ _id: id });
        reason.name = name;
        reason.save();
        res.redirect('/admin/reason');
    },
    deleteReason: async (req, res) => {
        const { id } = req.body;
        await Reason.findOneAndDelete({ _id: id });
        res.redirect('/admin/reason');
    },
    //BAGIAN PENYEBAB DISABILITAS
    viewVillage: async (req, res) => {
        const username = req.session.user;
        const villages = await Village.find()
            .populate({ path: 'subDistrictId' });
        const subdistricts = await SubDistrict.find();
        res.render('admin/village/view_village', {
            title: 'Disabilitas',
            user: 'admin',
            villages,
            subdistricts,
            username
        });
    },
    addVillage: async (req, res) => {
        const { name, subdistrictId } = req.body;
        await Village.create({ name: name, subDistrictId: subdistrictId });
        res.redirect('/admin/village');
    },
    editVillage: async (req, res) => {
        const { id, name, subdistrictId } = req.body;
        const village = await Village.findOne({ _id: id });
        village.name = name;
        village.subDistrictId = subdistrictId;
        village.save();
        res.redirect('/admin/village');
    },
    deleteVillage: async (req, res) => {
        const { id } = req.body;
        const village = await Village.findOneAndDelete({ _id: id });
        res.redirect('/admin/village');
    },
    //BAGIAN PENYEBAB DISABILITAS
    viewSubdistrict: async (req, res) => {
        const username = req.session.user;
        const subdistricts = await SubDistrict.find();
        res.render('admin/subdistrict/view_subdistrict', {
            title: 'Disabilitas',
            user: 'admin',
            subdistricts,
            username
        });
    },
    addSubdistrict: async (req, res) => {
        const { name } = req.body;
        await SubDistrict.create({ name: name });
        res.redirect('/admin/subdistrict');
    },
    editSubdistrict: async (req, res) => {
        const { id, name } = req.body;
        const subdistrict = await SubDistrict.findOne({ _id: id });
        subdistrict.name = name;
        subdistrict.save();
        res.redirect('/admin/subdistrict');
    },
    deleteSubdistrict: async (req, res) => {
        const { id } = req.body;
        await SubDistrict.findOneAndDelete({ _id: id });
        res.redirect('/admin/subdistrict');
    },
    //BAGIAN BANTUAN
    viewBantuan: async (req, res) => {
        const username = req.session.user;
        const jenisBantuans = await JenisBantuan.find();
        res.render('admin/jenisBantuan/view_jenisBantuan', {
            title: 'Disabilitas',
            user: 'admin',
            jenisBantuans,
            username
        });
    },
    addBantuan: async (req, res) => {
        const { name } = req.body;
        await JenisBantuan.create({ name: name });
        res.redirect('/admin/jenisbantuan')
    },
    editBantuan: async (req, res) => {
        const { id, name } = req.body;
        const jenisbantuan = await JenisBantuan.findOne({ _id: id });
        jenisbantuan.name = name;
        jenisbantuan.save();
        res.redirect('/admin/jenisbantuan')
    },
    deleteBantuan: async (req, res) => {
        const { id } = req.body;
        const jenisbantuan = await JenisBantuan.findOneAndDelete({ _id: id });
        res.redirect('/admin/jenisbantuan')
    },
}
