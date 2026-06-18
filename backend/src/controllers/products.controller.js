const pool = require('../config/db');

const getProducts = async (req, res, next) => {
  try {
    const { search = '', categoria = '' } = req.query;
    let sql = `
      SELECT p.*, c.nombre AS categoria
      FROM productos p
      LEFT JOIN categorias c ON c.id = p.categoria_id
      WHERE p.activo = 1
    `;
    const params = [];

    if (search) {
      sql += ' AND (p.nombre LIKE ? OR p.descripcion LIKE ? OR p.proveedor LIKE ?)';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }
    if (categoria) {
      sql += ' AND c.nombre = ?';
      params.push(categoria);
    }
    sql += ' ORDER BY p.id DESC';

    const [rows] = await pool.query(sql, params);
    res.json({ ok: true, products: rows });
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      `SELECT p.*, c.nombre AS categoria FROM productos p LEFT JOIN categorias c ON c.id = p.categoria_id WHERE p.id = ? AND p.activo = 1`,
      [req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ ok: false, message: 'Producto no encontrado' });
    res.json({ ok: true, product: rows[0] });
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const { nombre, descripcion, precio, stock, categoria_id, proveedor } = req.body;
    if (!nombre || precio === undefined || stock === undefined) {
      return res.status(400).json({ ok: false, message: 'Nombre, precio y stock son obligatorios' });
    }
    if (Number(precio) <= 0 || Number(stock) < 0) {
      return res.status(400).json({ ok: false, message: 'Precio debe ser mayor a 0 y stock no negativo' });
    }

    const [result] = await pool.query(
      `INSERT INTO productos (nombre, descripcion, precio, stock, categoria_id, proveedor) VALUES (?, ?, ?, ?, ?, ?)`,
      [nombre, descripcion || '', precio, stock, categoria_id || null, proveedor || '']
    );
    res.status(201).json({ ok: true, message: 'Producto creado correctamente', id: result.insertId });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { nombre, descripcion, precio, stock, categoria_id, proveedor } = req.body;
    const [exists] = await pool.query('SELECT id FROM productos WHERE id = ? AND activo = 1', [req.params.id]);
    if (exists.length === 0) return res.status(404).json({ ok: false, message: 'Producto no encontrado' });

    await pool.query(
      `UPDATE productos SET nombre=?, descripcion=?, precio=?, stock=?, categoria_id=?, proveedor=? WHERE id=?`,
      [nombre, descripcion || '', precio, stock, categoria_id || null, proveedor || '', req.params.id]
    );
    res.json({ ok: true, message: 'Producto actualizado correctamente' });
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const [result] = await pool.query('UPDATE productos SET activo = 0 WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ ok: false, message: 'Producto no encontrado' });
    res.json({ ok: true, message: 'Producto eliminado correctamente' });
  } catch (error) {
    next(error);
  }
};

const getCategories = async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM categorias ORDER BY nombre ASC');
    res.json({ ok: true, categories: rows });
  } catch (error) {
    next(error);
  }
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct, getCategories };
