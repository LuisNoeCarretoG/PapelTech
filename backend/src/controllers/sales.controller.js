const pool = require('../config/db');
const { calcularTotal, calcularStockRestante } = require('../utils/sale.utils');

const getSales = async (req, res, next) => {
  try {
    const [rows] = await pool.query(`
      SELECT v.*, u.nombre AS usuario, c.nombre AS cliente
      FROM ventas v
      LEFT JOIN usuarios u ON u.id = v.usuario_id
      LEFT JOIN clientes c ON c.id = v.cliente_id
      ORDER BY v.id DESC
    `);
    res.json({ ok: true, sales: rows });
  } catch (error) { next(error); }
};

const getSaleById = async (req, res, next) => {
  try {
    const [sale] = await pool.query('SELECT * FROM ventas WHERE id=?', [req.params.id]);
    if (sale.length === 0) return res.status(404).json({ ok: false, message: 'Venta no encontrada' });
    const [items] = await pool.query(`
      SELECT d.*, p.nombre AS producto
      FROM detalle_ventas d
      JOIN productos p ON p.id = d.producto_id
      WHERE d.venta_id=?
    `, [req.params.id]);
    res.json({ ok: true, sale: sale[0], items });
  } catch (error) { next(error); }
};

const createSale = async (req, res, next) => {
  const connection = await pool.getConnection();
  try {
    const { cliente_id, items, tipo = 'mostrador' } = req.body;
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ ok: false, message: 'La venta necesita productos' });
    }

    await connection.beginTransaction();
    const processedItems = [];

    for (const item of items) {
      const [rows] = await connection.query('SELECT id, nombre, precio, stock FROM productos WHERE id=? AND activo=1', [item.producto_id]);
      if (rows.length === 0) throw new Error('Producto no encontrado');
      const product = rows[0];
      const cantidad = Number(item.cantidad || 1);
      const nuevoStock = calcularStockRestante(product.stock, cantidad);
      await connection.query('UPDATE productos SET stock=? WHERE id=?', [nuevoStock, product.id]);
      processedItems.push({
        producto_id: product.id,
        cantidad,
        precio_unitario: Number(product.precio),
        subtotal: Number(product.precio) * cantidad
      });
    }

    const total = calcularTotal(processedItems);
    const [saleResult] = await connection.query(
      'INSERT INTO ventas (usuario_id, cliente_id, total, tipo) VALUES (?, ?, ?, ?)',
      [req.user.id, cliente_id || null, total, tipo]
    );

    for (const item of processedItems) {
      await connection.query(
        'INSERT INTO detalle_ventas (venta_id, producto_id, cantidad, precio_unitario, subtotal) VALUES (?, ?, ?, ?, ?)',
        [saleResult.insertId, item.producto_id, item.cantidad, item.precio_unitario, item.subtotal]
      );
    }

    await connection.commit();
    res.status(201).json({ ok: true, message: 'Pedido/venta registrado correctamente', venta_id: saleResult.insertId, total });
  } catch (error) {
    await connection.rollback();
    next(error);
  } finally {
    connection.release();
  }
};

module.exports = { getSales, getSaleById, createSale };
