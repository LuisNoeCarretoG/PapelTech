const pool = require('../config/db');

const getServices = async (req, res, next) => {
  try {
    const [rows] = await pool.query(`
      SELECT s.*, c.nombre AS cliente
      FROM servicios s
      LEFT JOIN clientes c ON c.id = s.cliente_id
      ORDER BY s.id DESC
    `);
    res.json({ ok: true, services: rows });
  } catch (error) { next(error); }
};

const createService = async (req, res, next) => {
  try {
    const { cliente_id, tipo_servicio, descripcion, costo, fecha_entrega, observaciones } = req.body;
    if (!tipo_servicio || !descripcion) {
      return res.status(400).json({ ok: false, message: 'Tipo de servicio y descripcion son obligatorios' });
    }
    const [result] = await pool.query(
      `INSERT INTO servicios (cliente_id, usuario_id, tipo_servicio, descripcion, costo, fecha_entrega, observaciones) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [cliente_id || null, req.user.id, tipo_servicio, descripcion, costo || 0, fecha_entrega || null, observaciones || '']
    );
    res.status(201).json({ ok: true, message: 'Servicio solicitado correctamente', id: result.insertId });
  } catch (error) { next(error); }
};

const updateService = async (req, res, next) => {
  try {
    const { estado, costo, observaciones } = req.body;
    const [result] = await pool.query(
      'UPDATE servicios SET estado=?, costo=?, observaciones=? WHERE id=?',
      [estado || 'Pendiente', costo || 0, observaciones || '', req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ ok: false, message: 'Servicio no encontrado' });
    res.json({ ok: true, message: 'Servicio actualizado correctamente' });
  } catch (error) { next(error); }
};

const deleteService = async (req, res, next) => {
  try {
    const [result] = await pool.query('DELETE FROM servicios WHERE id=?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ ok: false, message: 'Servicio no encontrado' });
    res.json({ ok: true, message: 'Servicio eliminado correctamente' });
  } catch (error) { next(error); }
};

module.exports = { getServices, createService, updateService, deleteService };
