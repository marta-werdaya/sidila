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
const { PenerimaBantuan } = require('../models/penerimaBantuan');

module.exports = {
    //BAGIAN LANSIA
    viewDashboard: async (req, res) => {
        try {
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
        } catch (e) {
            res.redirect('/user/dashboard');
        }

    },
    //BAGIAN LANSIA
    viewLansia: async (req, res) => {
        try {
            const username = req.session.user;
            const jenisBantuan = await JenisBantuan.find();
            const lansias = await Lansia.find()
                .populate({ path: 'personId', populate: { path: 'villageId' } })
                .populate({ path: 'personId', populate: { path: 'proposalId' } });
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = { message: alertMessage, status: alertStatus };
            res.render('admin/lansia/view_lansia', {
                title: 'LANSIA',
                user: 'admin',
                lansias,
                alert,
                username,
                jenisBantuan,
            });
        } catch (e) {
            res.redirect('/admin/lansia');
        }

    },
    validasiLansia: async (req, res) => {
        try {
            const { id } = req.params;
            const proposal = await Proposal.findOne({ _id: id });
            proposal.status = "Diterima";
            proposal.reason = "Telah Memenuhi syarat";
            await proposal.save();
            req.flash('alertMessage', 'Berhasil Memvalidasi Data');
            req.flash('alertStatus', 'success');
            res.redirect('/admin/lansia');
        } catch (e) {
            req.flash('alertMessage', `${e.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/lansia');
        }
    },
    rejectLansia: async (req, res) => {
        try {
            const { id, reason } = req.body;
            console.log(reason);
            const keterangan = "belum memenuhi kriteria";
            const proposal = await Proposal.findOne({ _id: id });
            proposal.status = "Ditolak";
            proposal.reason = (reason == null || reason == undefined) ? keterangan : reason;
            await proposal.save();
            req.flash('alertMessage', 'Berhasil Menolak Data');
            req.flash('alertStatus', 'success');
            res.redirect('/admin/lansia');
        } catch (e) {
            req.flash('alertMessage', `${e.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/lansia');
        }
    },
    giveLansia: async (req, res) => {
        try {
            const { id, penerima, jenisBantuan } = req.body;
            const proposal = await Proposal.findOne({ _id: id });
            proposal.status = "Bantuan Diterima";
            await proposal.save();
            const bantuan = await PenerimaBantuan.create({ proposalId: id, penerima: penerima, jenisBantuan: jenisBantuan });
            req.flash('alertMessage', 'Berhasil Mengubah status Data');
            req.flash('alertStatus', 'success');
            res.redirect('/admin/lansia');
        } catch (e) {
            req.flash('alertMessage', `${e.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/lansia');
        }
    },
    //BAGIAN DISABILITAS
    viewDisabilitas: async (req, res) => {
        try {
            const username = req.session.user;
            const jenisBantuan = await JenisBantuan.find();
            const disabilities = await Disability.find()
                .populate({ path: 'parentId' })
                .populate({ path: 'educationId' })
                .populate({ path: 'reasonId' })
                .populate({ path: 'disabilityTypeId' })
                .populate({ path: 'personId', populate: { path: 'villageId' } })
                .populate({ path: 'personId', populate: { path: 'proposalId' } });
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = { message: alertMessage, status: alertStatus };
            res.render('admin/disabilities/view_disabilities', {
                title: 'Disabilitas',
                user: 'admin',
                alert,
                disabilities,
                username,
                jenisBantuan,
            });
        } catch (e) {
            res.redirect('/admin/disabilitas');
        }
    },
    validasiDisabilitas: async (req, res) => {
        try {
            const { id } = req.params;
            const proposal = await Proposal.findOne({ _id: id });
            proposal.status = "Diterima";
            proposal.reason = "Telah Memenuhi syarat";
            await proposal.save();
            req.flash('alertMessage', 'Berhasil memvalidasi Data');
            req.flash('alertStatus', 'success');
            res.redirect('/admin/disabilitas');
        } catch (e) {
            req.flash('alertMessage', `${e.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/disabilitas');
        }
    },
    rejectDisabilitas: async (req, res) => {
        try {
            const { id, reason } = req.body;
            const keterangan = "belum memenuhi kriteria";
            const proposal = await Proposal.findOne({ _id: id });
            proposal.status = "Ditolak";
            proposal.reason = (reason == null || reason == undefined) ? keterangan : reason;
            await proposal.save();
            req.flash('alertMessage', 'Berhasil Monolak Data');
            req.flash('alertStatus', 'success');
            res.redirect('/admin/disabilitas');
        } catch (e) {
            req.flash('alertMessage', `${e.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/disabilitas');
        }
    },
    giveDisability: async (req, res) => {
        try {
            const { id, penerima, jenisBantuan } = req.body;
            const proposal = await Proposal.findOne({ _id: id });
            proposal.status = "Bantuan Diterima";
            await proposal.save();
            const bantuan = await PenerimaBantuan.create({ proposalId: id, penerima: penerima, jenisBantuan: jenisBantuan });
            req.flash('alertMessage', 'Berhasil Mengubah Status Data');
            req.flash('alertStatus', 'success');
            res.redirect('/admin/disabilitas');
        } catch (e) {
            req.flash('alertMessage', `${e.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/disabilitas');
        }
    },
    //BAGIAN TIPE DISABILITAS
    viewDisabilityType: async (req, res) => {
        try {
            const username = req.session.user;
            const disability = await DisabilityType.find();
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = { message: alertMessage, status: alertStatus };
            res.render('admin/disabilityType/view_disabilityType', {
                title: 'Disabilitas',
                user: 'admin',
                alert,
                disability,
                username
            });
        } catch (e) {
            res.redirect('/admin/disability-type');
        }
    },
    addDisabilityType: async (req, res) => {
        try {
            const { name } = req.body;
            await DisabilityType.create({ name: name });
            req.flash('alertMessage', 'Berhasil Menambah Data');
            req.flash('alertStatus', 'success');
            res.redirect('/admin/disability-type');
        } catch (e) {
            req.flash('alertMessage', `${e.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/disability-type');
        }

    },
    editDisabilityType: async (req, res) => {
        try {
            const { id, name } = req.body;
            const disability = await DisabilityType.findOne({ _id: id });
            disability.name = name;
            disability.save();
            req.flash('alertMessage', 'Berhasil Mengubah Data');
            req.flash('alertStatus', 'success');
            res.redirect('/admin/disability-type');
        } catch (e) {
            req.flash('alertMessage', `${e.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/disability-type');
        }

    },
    deleteDisabilityType: async (req, res) => {
        try {
            const { id } = req.body;
            await DisabilityType.findByIdAndDelete({ _id: id });
            req.flash('alertMessage', 'Berhasil Menghapus Data');
            req.flash('alertStatus', 'success');
            res.redirect('/admin/disability-type');
        } catch (e) {
            req.flash('alertMessage', `${e.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/disability-type');
        }
    },
    //BAGIAN PENYEBAB DISABILITAS
    viewReason: async (req, res) => {
        try {
            const username = req.session.user;
            const reasons = await Reason.find();
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = { message: alertMessage, status: alertStatus };
            res.render('admin/reason/view_reason', {
                title: 'Disabilitas',
                user: 'admin',
                reasons,
                alert,
                username,
            });
        } catch (e) {
            res.redirect('/admin/reason');
        }
    },
    addReason: async (req, res) => {
        try {
            const { name } = req.body;
            await Reason.create({ name: name });
            req.flash('alertMessage', 'Berhasil Menambah Data');
            req.flash('alertStatus', 'success');
            res.redirect('/admin/reason');
        } catch (e) {
            req.flash('alertMessage', `${e.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/reason');
        }
    },
    editReason: async (req, res) => {
        try {
            const { id, name } = req.body;
            const reason = await Reason.findOne({ _id: id });
            reason.name = name;
            reason.save();
            req.flash('alertMessage', 'Berhasil Mengubah Data');
            req.flash('alertStatus', 'success');
            res.redirect('/admin/reason');
        } catch (e) {
            req.flash('alertMessage', `${e.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/reason');
        }
    },
    deleteReason: async (req, res) => {
        try {
            const { id } = req.body;
            await Reason.findOneAndDelete({ _id: id });
            req.flash('alertMessage', 'Berhasil Menghapus Data');
            req.flash('alertStatus', 'success');
            res.redirect('/admin/reason');
        } catch (e) {
            req.flash('alertMessage', `${e.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/reason');
        }
    },
    //BAGIAN PENYEBAB DISABILITAS
    viewVillage: async (req, res) => {
        try {
            const username = req.session.user;
            const villages = await Village.find()
                .populate({ path: 'subDistrictId' });
            const subdistricts = await SubDistrict.find();
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = { message: alertMessage, status: alertStatus };
            res.render('admin/village/view_village', {
                title: 'Disabilitas',
                user: 'admin',
                villages,
                alert,
                subdistricts,
                username
            });
        } catch (e) {
            res.redirect('/admin/village');
        }
    },
    addVillage: async (req, res) => {
        try {
            const { name, subdistrictId } = req.body;
            await Village.create({ name: name, subDistrictId: subdistrictId });
            req.flash('alertMessage', 'Berhasil Menambah Data');
            req.flash('alertStatus', 'success');
            res.redirect('/admin/village');
        } catch (e) {
            req.flash('alertMessage', `${e.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/village');
        }
    },
    editVillage: async (req, res) => {
        try {
            const { id, name, subdistrictId } = req.body;
            const village = await Village.findOne({ _id: id });
            village.name = name;
            village.subDistrictId = subdistrictId;
            village.save();
            req.flash('alertMessage', 'Berhasil Mengubah Data');
            req.flash('alertStatus', 'success');
            res.redirect('/admin/village');
        } catch (e) {
            req.flash('alertMessage', `${e.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/village');
        }
    },
    deleteVillage: async (req, res) => {
        try {
            const { id } = req.body;
            const village = await Village.findOneAndDelete({ _id: id });
            req.flash('alertMessage', 'Berhasil Menghapus Data');
            req.flash('alertStatus', 'success');
            res.redirect('/admin/village');
        } catch (e) {
            req.flash('alertMessage', `${e.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/village');
        }
    },
    //BAGIAN PENYEBAB DISABILITAS
    viewSubdistrict: async (req, res) => {
        try {
            const username = req.session.user;
            const subdistricts = await SubDistrict.find();
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = { message: alertMessage, status: alertStatus };
            res.render('admin/subdistrict/view_subdistrict', {
                title: 'Disabilitas',
                user: 'admin',
                alert,
                subdistricts,
                username
            });
        } catch (e) {
            res.redirect('/admin/subdistrict');
        }
    },
    addSubdistrict: async (req, res) => {
        try {
            const { name } = req.body;
            await SubDistrict.create({ name: name });
            req.flash('alertMessage', 'Berhasil Menambah Data');
            req.flash('alertStatus', 'success');
            res.redirect('/admin/subdistrict');
        } catch (e) {
            req.flash('alertMessage', `${e.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/subdistrict');
        }
    },
    editSubdistrict: async (req, res) => {
        try {
            const { id, name } = req.body;
            const subdistrict = await SubDistrict.findOne({ _id: id });
            subdistrict.name = name;
            subdistrict.save();
            req.flash('alertMessage', 'Berhasil Mengubah Data');
            req.flash('alertStatus', 'success');
            res.redirect('/admin/subdistrict');
        } catch (e) {
            req.flash('alertMessage', `${e.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/subdistrict');
        }
    },
    deleteSubdistrict: async (req, res) => {
        try {
            const { id } = req.body;
            await SubDistrict.findOneAndDelete({ _id: id });
            req.flash('alertMessage', 'Berhasil menghapus Data');
            req.flash('alertStatus', 'success');
            res.redirect('/admin/subdistrict');
        } catch (e) {
            req.flash('alertMessage', `${e.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/subdistrict');
        }
    },
    //BAGIAN BANTUAN
    viewBantuan: async (req, res) => {
        try {
            const username = req.session.user;
            const jenisBantuans = await JenisBantuan.find();
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = { message: alertMessage, status: alertStatus };
            res.render('admin/jenisBantuan/view_jenisBantuan', {
                title: 'Disabilitas',
                user: 'admin',
                alert,
                jenisBantuans,
                username
            });
        } catch (e) {
            res.redirect('/admin/jenisbantuan')
        }
    },
    addBantuan: async (req, res) => {
        try {
            const { name, pemberi } = req.body;
            await JenisBantuan.create({ name: name, pemberi: pemberi });
            req.flash('alertMessage', 'Berhasil Menambah Data');
            req.flash('alertStatus', 'success');
            res.redirect('/admin/jenisbantuan');
        } catch (e) {
            req.flash('alertMessage', `${e.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/jenisbantuan');
        }
    },
    editBantuan: async (req, res) => {
        try {
            const { id, name, pemberi } = req.body;
            const jenisbantuan = await JenisBantuan.findOne({ _id: id });
            jenisbantuan.name = name;
            jenisbantuan.pemberi = pemberi;
            jenisbantuan.save();
            req.flash('alertMessage', 'Berhasil Mengubah Data');
            req.flash('alertStatus', 'success');
            res.redirect('/admin/jenisbantuan');
        } catch (e) {
            req.flash('alertMessage', `${e.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/jenisbantuan');
        }
    },
    deleteBantuan: async (req, res) => {
        try {
            const { id } = req.body;
            const jenisbantuan = await JenisBantuan.findOneAndDelete({ _id: id });
            req.flash('alertMessage', 'Berhasil menghapus Data');
            req.flash('alertStatus', 'success');
            res.redirect('/admin/jenisbantuan');
        } catch (e) {
            req.flash('alertMessage', `${e.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/jenisbantuan');
        }
    },
    //BAGIAN BANTUAN
    viewBantuanDisabilitas: async (req, res) => {
        try {
            const username = req.session.user;
            const penerimas = await PenerimaBantuan.find()
                .populate({ path: 'jenisBantuan' })
                .populate({ path: 'proposalId', populate: { path: 'personId' } });
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = { message: alertMessage, status: alertStatus };
            res.render('admin/bantuanDisabilitas/view_penerima', {
                title: 'Disabilitas',
                user: 'admin',
                penerimas,
                alert,
                username,
            });
        } catch (e) {
            res.redirect('/admin/bantuan-disabilitas');
        }
    },
    viewBantuanLansia: async (req, res) => {
        try {
            const username = req.session.user;
            const penerimas = await PenerimaBantuan.find()
                .populate({ path: 'jenisBantuan' })
                .populate({ path: 'proposalId', populate: { path: 'personId' } });
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = { message: alertMessage, status: alertStatus };
            res.render('admin/bantuanLansia/view_penerima', {
                title: 'Disabilitas',
                user: 'admin',
                penerimas,
                alert,
                username,
            });
        } catch (e) {
            res.redirect('/admin/bantuan-lansia');
        }
    },
}
