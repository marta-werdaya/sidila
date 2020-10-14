const router = require('express').Router();
const adminController = require('../controller/adminController');
const auth = require('../middleware/auth');

router.use(auth);
router.get('/dashboard', adminController.viewDashboard);
//Endpoint Lansia
router.get('/lansia', adminController.viewLansia);
router.put('/lansia', adminController.rejectLansia);
router.put('/lansia/:id', adminController.validasiLansia);
router.put('/bantulansia', adminController.giveLansia);
//
router.get('/disabilitas', adminController.viewDisabilitas);
router.put('/disabilitas', adminController.rejectDisabilitas);
router.put('/disabilitas/:id', adminController.validasiDisabilitas);
router.put('/bantudisabilitas', adminController.giveDisability);
//
router.get('/disability-type', adminController.viewDisabilityType);
router.post('/disability-type', adminController.addDisabilityType);
router.put('/disability-type', adminController.editDisabilityType);
router.delete('/disability-type', adminController.deleteDisabilityType);
//
router.get('/reason', adminController.viewReason);
router.post('/reason', adminController.addReason);
router.put('/reason', adminController.editReason);
router.delete('/reason', adminController.deleteReason);
//ENDPOINT VILLAGE
router.get('/village', adminController.viewVillage);
router.post('/village', adminController.addVillage);
router.put('/village', adminController.editVillage);
router.delete('/village', adminController.deleteVillage);
//ENDPOINT SUBDISTRICT
router.get('/subdistrict', adminController.viewSubdistrict);
router.post('/subdistrict', adminController.addSubdistrict);
router.put('/subdistrict', adminController.editSubdistrict);
router.delete('/subdistrict', adminController.deleteSubdistrict);

router.get('/jenisbantuan', adminController.viewBantuan);
router.post('/jenisbantuan', adminController.addBantuan);
router.put('/jenisbantuan', adminController.editBantuan);
router.delete('/jenisbantuan', adminController.deleteBantuan);
//
router.get('/bantuan-disabilitas', adminController.viewBantuanDisabilitas);
router.get('/bantuan-lansia', adminController.viewBantuanLansia);
module.exports = router;