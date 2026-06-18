const path = require('path');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');

dotenv.config({ path: path.join(__dirname, '../.env.railway') });

async function seedRailway() {
  let connection;

  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      multipleStatements: true
    });

    console.log('Conectado a Railway. Insertando datos iniciales...');

    const passwordAdmin = await bcrypt.hash('Admin123*', 10);
    const passwordEmpleado = await bcrypt.hash('Empleado123*', 10);
    const passwordCliente = await bcrypt.hash('Cliente123*', 10);

    await connection.query(`
      SET FOREIGN_KEY_CHECKS = 0;

      DELETE FROM detalle_ventas;
      DELETE FROM ventas;
      DELETE FROM servicios;
      DELETE FROM clientes;
      DELETE FROM productos;
      DELETE FROM usuarios;
      DELETE FROM categorias;

      ALTER TABLE categorias AUTO_INCREMENT = 1;
      ALTER TABLE usuarios AUTO_INCREMENT = 1;
      ALTER TABLE productos AUTO_INCREMENT = 1;
      ALTER TABLE clientes AUTO_INCREMENT = 1;
      ALTER TABLE ventas AUTO_INCREMENT = 1;
      ALTER TABLE detalle_ventas AUTO_INCREMENT = 1;
      ALTER TABLE servicios AUTO_INCREMENT = 1;

      SET FOREIGN_KEY_CHECKS = 1;
    `);

    await connection.query(`
      INSERT INTO categorias (nombre) VALUES
      ('Útiles escolares'),
      ('Papelería de oficina'),
      ('Impresión y copias'),
      ('Tecnología y accesorios'),
      ('Servicios de mantenimiento');
    `);

    await connection.query(
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

    await connection.query(`
      INSERT INTO clientes (nombre, telefono, correo, direccion) VALUES
      ('Cliente Mostrador', '4491234567', 'cliente.mostrador@mail.com', 'Aguascalientes'),
      ('Escuela Benito Juarez', '4497654321', 'contacto@escuela.com', 'Zona centro'),
      ('Oficina Contable MX', '4491112233', 'oficina@mail.com', 'Colonia del Valle');
    `);

    await connection.query(`
      INSERT INTO productos (nombre, descripcion, precio, stock, categoria_id, proveedor) VALUES
      ('Cuaderno profesional raya', 'Cuaderno de 100 hojas tamaño profesional', 35.00, 40, 1, 'Scribe'),
      ('Cuaderno profesional cuadro grande', 'Cuaderno de 100 hojas cuadro grande', 38.00, 35, 1, 'Scribe'),
      ('Cuaderno forma italiana', 'Cuaderno chico forma italiana de 100 hojas', 28.00, 50, 1, 'Norma'),
      ('Lápiz Mirado No. 2', 'Lápiz de grafito para escritura escolar', 8.00, 150, 1, 'Dixon'),
      ('Lapicero tinta negra', 'Lapicero punto mediano para oficina y escuela', 8.50, 150, 1, 'Bic'),
      ('Pluma azul Bic', 'Pluma tinta azul punto mediano', 10.00, 100, 1, 'Bic'),
      ('Pluma roja Bic', 'Pluma tinta roja punto mediano', 10.00, 80, 1, 'Bic'),
      ('Borrador blanco', 'Borrador blanco escolar', 7.00, 120, 1, 'Pelikan'),
      ('Sacapuntas con depósito', 'Sacapuntas plástico con depósito', 15.00, 60, 1, 'Maped'),
      ('Regla de 30 cm', 'Regla transparente de 30 centímetros', 18.00, 70, 1, 'Maped'),
      ('Juego de geometría', 'Juego con regla, escuadras, transportador y compás', 55.00, 35, 1, 'Maped'),
      ('Caja de colores 12 piezas', 'Colores escolares de madera', 55.00, 35, 1, 'Maped'),

      ('Resma de hojas carta', 'Paquete de 500 hojas blancas tamaño carta', 115.00, 25, 2, 'Copamex'),
      ('Folder tamaño carta', 'Folder beige para documentos', 4.00, 200, 2, 'Norma'),
      ('Carpeta de argollas', 'Carpeta blanca de tres argollas', 55.00, 30, 2, 'Wilson Jones'),
      ('Separadores de colores', 'Separadores para carpeta con pestañas', 25.00, 45, 2, 'Norma'),
      ('Cinta adhesiva transparente', 'Cinta adhesiva para oficina', 18.00, 75, 2, 'Janel'),
      ('Engrapadora pequeña', 'Engrapadora metálica pequeña', 55.00, 25, 2, 'Pegaso'),
      ('Caja de grapas', 'Caja de grapas estándar', 18.00, 80, 2, 'Pegaso'),
      ('Clips metálicos', 'Caja de clips metálicos', 15.00, 90, 2, 'Barrilito'),

      ('Impresión blanco y negro', 'Servicio de impresión por hoja', 2.00, 999, 3, 'Interno'),
      ('Impresión a color', 'Servicio de impresión a color por hoja', 8.00, 999, 3, 'Interno'),
      ('Copia blanco y negro', 'Servicio de copia por hoja', 1.50, 999, 3, 'Interno'),
      ('Engargolado básico', 'Servicio de engargolado tamaño carta', 35.00, 999, 3, 'Interno'),
      ('Enmicado tamaño carta', 'Servicio de enmicado tamaño carta', 25.00, 999, 3, 'Interno'),

      ('Memoria USB 32GB', 'USB para guardar archivos escolares y de oficina', 120.00, 15, 4, 'Kingston'),
      ('Memoria USB 64GB', 'USB de 64GB para documentos y respaldos', 170.00, 15, 4, 'Kingston'),
      ('Mouse USB básico', 'Mouse alámbrico USB para computadora', 95.00, 18, 4, 'Logitech'),
      ('Teclado USB básico', 'Teclado alámbrico USB para oficina', 160.00, 10, 4, 'Logitech'),
      ('Cable USB tipo C', 'Cable USB tipo C para carga y datos', 75.00, 25, 4, 'Genérico');
    `);

    await connection.query(`
      INSERT INTO servicios (cliente_id, usuario_id, tipo_servicio, descripcion, estado, costo, observaciones) VALUES
      (1, 2, 'Mantenimiento de impresora', 'Limpieza general y revisión de cartuchos', 'Pendiente', 250.00, 'Equipo recibido en mostrador'),
      (2, 2, 'Engargolado', 'Engargolado de 20 manuales escolares', 'En proceso', 400.00, 'Entrega estimada mañana');
    `);

    console.log('Datos iniciales insertados correctamente en Railway.');
    console.log('Admin: admin@papeltech.com / Admin123*');
    console.log('Empleado: empleado1@papeltech.com / Empleado123*');
    console.log('Cliente: cliente@papeltech.com / Cliente123*');
  } catch (error) {
    console.error('Error al insertar datos iniciales en Railway:');
    console.error(error.message);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

seedRailway();