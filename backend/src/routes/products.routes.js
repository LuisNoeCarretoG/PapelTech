const router = require('express').Router();
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct, getCategories } = require('../controllers/products.controller');
const { verifyToken } = require('../middlewares/auth.middleware');
const { allowRoles } = require('../middlewares/role.middleware');

router.get('/categories', getCategories);
router.get('/', getProducts); // publico: visitante puede navegar libremente
router.get('/:id', getProductById); // publico: visitante puede ver detalle
router.post('/', verifyToken, allowRoles('admin'), createProduct);
router.put('/:id', verifyToken, allowRoles('admin'), updateProduct);
router.delete('/:id', verifyToken, allowRoles('admin'), deleteProduct);

module.exports = router;
