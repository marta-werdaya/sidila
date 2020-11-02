const router = require('express').Router();
const user = require('../controller/userController');
const auth = require('../middleware/auth');
const { upload } = require('../middleware/multer');

router.use(auth);
router.get('/dashboard', user.viewDashboard);
//Endpoint Disabilitas
router.get('/disabilitas', user.viewDisabilitas);
router.post('/disabilitas', upload, user.addDisabilitas);
router.put('/disabilitas', user.editDisabilitas);
router.delete('/disabilitas', user.deleteDisabilitas);
//Endpoint Lansia
router.get('/lansia', user.viewLansia);
router.post('/lansia', upload, user.addLansia);
router.put('/lansia', user.editLansia);
router.delete('/lansia', user.deleteLansia);

// router.get('/disability-type', user.viewDisabilityType);
// router.get('/reason', user.viewReason);

module.exports = router;