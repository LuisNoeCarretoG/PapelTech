const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

const createToken = (user) => {
  return jwt.sign(
    { id: user.id, nombre: user.nombre, correo: user.correo, rol: user.rol },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '8h' }
  );
};

const register = async (req, res, next) => {
  try {
    const { nombre, correo, password, rol } = req.body;

    if (!nombre || !correo || !password) {
      return res.status(400).json({ ok: false, message: 'Nombre, correo y password son obligatorios' });
    }
    if (password.length < 6) {
      return res.status(400).json({ ok: false, message: 'La contraseña debe tener minimo 6 caracteres' });
    }

    const safeRole = rol && ['admin', 'empleado', 'cliente'].includes(rol) ? rol : 'cliente';

    const [exists] = await pool.query('SELECT id FROM usuarios WHERE correo = ?', [correo]);
    if (exists.length > 0) {
      return res.status(409).json({ ok: false, message: 'El correo ya esta registrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      'INSERT INTO usuarios (nombre, correo, password, rol) VALUES (?, ?, ?, ?)',
      [nombre, correo, hashedPassword, safeRole]
    );

    res.status(201).json({
      ok: true,
      message: 'Usuario registrado correctamente',
      user: { id: result.insertId, nombre, correo, rol: safeRole }
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { correo, password } = req.body;
    if (!correo || !password) {
      return res.status(400).json({ ok: false, message: 'Correo y password son obligatorios' });
    }

    const [rows] = await pool.query('SELECT * FROM usuarios WHERE correo = ? AND activo = 1', [correo]);
    if (rows.length === 0) {
      return res.status(401).json({ ok: false, message: 'Credenciales incorrectas' });
    }

    const user = rows[0];
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ ok: false, message: 'Credenciales incorrectas' });
    }

    const token = createToken(user);
    res.json({
      ok: true,
      message: 'Inicio de sesion correcto',
      token,
      user: { id: user.id, nombre: user.nombre, correo: user.correo, rol: user.rol }
    });
  } catch (error) {
    next(error);
  }
};

const profile = async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT id, nombre, correo, rol, fecha_registro FROM usuarios WHERE id = ?', [req.user.id]);
    if (rows.length === 0) {
      return res.status(404).json({ ok: false, message: 'Usuario no encontrado' });
    }
    res.json({ ok: true, user: rows[0] });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, profile };
