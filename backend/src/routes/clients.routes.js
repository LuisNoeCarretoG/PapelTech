const router = require('express').Router();
const { getClients, createClient, updateClient, deleteClient } = require('../controllers/clients.controller');
const { verifyToken } = require('../middlewares/auth.middleware');
const { allowRoles } = require('../middlewares/role.middleware');

router.get('/', verifyToken, allowRoles('admin', 'empleado'), getClients);
router.post('/', verifyToken, allowRoles('admin', 'empleado'), createClient);
router.put('/:id', verifyToken, allowRoles('admin', 'empleado'), updateClient);
router.delete('/:id', verifyToken, allowRoles('admin'), deleteClient);

module.exports = router;
