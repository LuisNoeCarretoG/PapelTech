const router = require('express').Router();
const { getServices, createService, updateService, deleteService } = require('../controllers/services.controller');
const { verifyToken } = require('../middlewares/auth.middleware');
const { allowRoles } = require('../middlewares/role.middleware');

router.get('/', verifyToken, allowRoles('admin', 'empleado'), getServices);
router.post('/', verifyToken, allowRoles('admin', 'empleado', 'cliente'), createService);
router.put('/:id', verifyToken, allowRoles('admin', 'empleado'), updateService);
router.delete('/:id', verifyToken, allowRoles('admin'), deleteService);

module.exports = router;
