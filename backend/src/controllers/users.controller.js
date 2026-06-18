const pool = require('../config/db');

const getUsers = async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT id, nombre, correo, rol, activo, fecha_registro FROM usuarios ORDER BY id DESC');
    res.json({ ok: true, users: rows });
  } catch (error) { next(error); }
};

module.exports = { getUsers };
