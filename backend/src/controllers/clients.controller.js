const pool = require('../config/db');

const getClients = async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM clientes ORDER BY id DESC');
    res.json({ ok: true, clients: rows });
  } catch (error) { next(error); }
};

const createClient = async (req, res, next) => {
  try {
    const { nombre, telefono, correo, direccion } = req.body;
    if (!nombre) return res.status(400).json({ ok: false, message: 'Nombre del cliente requerido' });
    const [result] = await pool.query(
      'INSERT INTO clientes (nombre, telefono, correo, direccion) VALUES (?, ?, ?, ?)',
      [nombre, telefono || '', correo || '', direccion || '']
    );
    res.status(201).json({ ok: true, message: 'Cliente creado correctamente', id: result.insertId });
  } catch (error) { next(error); }
};

const updateClient = async (req, res, next) => {
  try {
    const { nombre, telefono, correo, direccion } = req.body;
    const [result] = await pool.query(
      'UPDATE clientes SET nombre=?, telefono=?, correo=?, direccion=? WHERE id=?',
      [nombre, telefono || '', correo || '', direccion || '', req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ ok: false, message: 'Cliente no encontrado' });
    res.json({ ok: true, message: 'Cliente actualizado correctamente' });
  } catch (error) { next(error); }
};

const deleteClient = async (req, res, next) => {
  try {
    const [result] = await pool.query('DELETE FROM clientes WHERE id=?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ ok: false, message: 'Cliente no encontrado' });
    res.json({ ok: true, message: 'Cliente eliminado correctamente' });
  } catch (error) { next(error); }
};

module.exports = { getClients, createClient, updateClient, deleteClient };
