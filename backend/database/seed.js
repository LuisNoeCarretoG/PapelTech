require('dotenv').config();
const bcrypt = require('bcryptjs');
const pool = require('../src/config/db');

async function seed() {
  try {
    const passwordAdmin = await bcrypt.hash('Admin123*', 10);
    const passwordEmpleado = await bcrypt.hash('Empleado123*', 10);
    const passwordCliente = await bcrypt.hash('Cliente123*', 10);

    await pool.query('DELETE FROM detalle_ventas');
    await pool.query('DELETE FROM ventas');
    await pool.query('DELETE FROM servicios');
    await pool.query('DELETE FROM clientes');
    await pool.query('DELETE FROM productos');
    await pool.query('DELETE FROM usuarios');
    await pool.query('ALTER TABLE usuarios AUTO_INCREMENT = 1');
    await pool.query('ALTER TABLE productos AUTO_INCREMENT = 1');
    await pool.query('ALTER TABLE clientes AUTO_INCREMENT = 1');
    await pool.query('ALTER TABLE servicios AUTO_INCREMENT = 1');

    await pool.query(
      `INSERT INTO usuarios (nombre, correo, password, rol) VALUES
      (?, ?, ?, 'admin'),
      (?, ?, ?, 'empleado'),
      (?, ?, ?, 'empleado'),
      (?, ?, ?, 'cliente')`,
      [
        'Administrador PapelTech', 'admin@papeltech.com', passwordAdmin,
        'Empleado Mostrador', 'empleado1@papeltech.com', passwordEmpleado,
        'Empleado Servicios', 'empleado2@papeltech.com', passwordEmpleado,
        'Cliente Demo', 'cliente@papeltech.com', passwordCliente
      ]
    );

    await pool.query(
      `INSERT INTO clientes (nombre, telefono, correo, direccion) VALUES
      ('Cliente Mostrador', '4491234567', 'cliente.mostrador@mail.com', 'Aguascalientes'),
      ('Escuela Benito Juarez', '4497654321', 'contacto@escuela.com', 'Zona centro'),
      ('Oficina Contable MX', '4491112233', 'oficina@mail.com', 'Colonia del Valle')`
    );

    await pool.query(
      `INSERT INTO productos (nombre, descripcion, precio, stock, categoria_id, proveedor) VALUES
      ('Cuaderno profesional raya', 'Cuaderno de 100 hojas tamaño profesional', 35.00, 40, 1, 'Scribe'),
      ('Lapicero tinta negra', 'Lapicero punto mediano para oficina y escuela', 8.50, 150, 1, 'Bic'),
      ('Resma de hojas carta', 'Paquete de 500 hojas blancas tamaño carta', 115.00, 25, 2, 'Copamex'),
      ('Folder tamaño carta', 'Folder beige para documentos', 4.00, 200, 2, 'Norma'),
      ('Memoria USB 32GB', 'USB para guardar archivos escolares y de oficina', 120.00, 15, 4, 'Kingston'),
      ('Impresion blanco y negro', 'Servicio de impresion por hoja', 2.00, 999, 3, 'Interno')`
    );

    await pool.query(
      `INSERT INTO servicios (cliente_id, usuario_id, tipo_servicio, descripcion, estado, costo, observaciones) VALUES
      (1, 2, 'Mantenimiento de impresora', 'Limpieza general y revision de cartuchos', 'Pendiente', 250.00, 'Equipo recibido en mostrador'),
      (2, 2, 'Engargolado', 'Engargolado de 20 manuales escolares', 'En proceso', 400.00, 'Entrega estimada mañana')`
    );

    console.log('Datos iniciales insertados correctamente.');
    console.log('Admin: admin@papeltech.com / Admin123*');
    console.log('Empleado: empleado1@papeltech.com / Empleado123*');
    console.log('Cliente: cliente@papeltech.com / Cliente123*');
  } catch (error) {
    console.error('Error al insertar datos iniciales:');
    console.error(error.message);
    console.error('Revisa que hayas ejecutado database/schema.sql en phpMyAdmin y que el archivo .env tenga la contraseña correcta de MySQL.');
  } finally {
    await pool.end();
  }
}

seed();
