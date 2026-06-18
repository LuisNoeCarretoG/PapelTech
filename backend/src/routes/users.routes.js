const router = require('express').Router();
const { getUsers } = require('../controllers/users.controller');
const { verifyToken } = require('../middlewares/auth.middleware');
const { allowRoles } = require('../middlewares/role.middleware');

router.get('/', verifyToken, allowRoles('admin'), getUsers);

module.exports = router;
