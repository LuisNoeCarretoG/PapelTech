const path = require('path');
const dotenv = require('dotenv');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

dotenv.config({ path: path.join(__dirname, '../.env.railway') });

async function resetEmpleado() {
  let connection;

  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    const passwordEmpleado = await bcrypt.hash('Empleado123*', 10);

    await connection.execute(
      `INSERT INTO usuarios (nombre, correo, password, rol)
       VALUES (?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
       nombre = VALUES(nombre),
       password = VALUES(password),
       rol = VALUES(rol)`,
      ['Empleado Mostrador', 'empleado1@papeltech.com', passwordEmpleado, 'empleado']
    );

    console.log('Empleado actualizado correctamente.');
    console.log('Correo: empleado1@papeltech.com');
    console.log('Contraseña: Empleado123*');
  } catch (error) {
    console.error('Error al actualizar empleado:');
    console.error(error.message);
  } finally {
    if (connection) await connection.end();
  }
}

resetEmpleado();
