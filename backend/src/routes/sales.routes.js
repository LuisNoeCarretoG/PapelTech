const router = require('express').Router();
const { getSales, getSaleById, createSale } = require('../controllers/sales.controller');
const { verifyToken } = require('../middlewares/auth.middleware');
const { allowRoles } = require('../middlewares/role.middleware');

router.get('/', verifyToken, allowRoles('admin', 'empleado'), getSales);
router.get('/:id', verifyToken, allowRoles('admin', 'empleado'), getSaleById);
router.post('/', verifyToken, allowRoles('admin', 'empleado', 'cliente'), createSale);

module.exports = router;
