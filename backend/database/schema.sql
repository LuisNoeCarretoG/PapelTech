DROP DATABASE IF EXISTS papeltech_db;
CREATE DATABASE papeltech_db CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE papeltech_db;

CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(120) NOT NULL,
  correo VARCHAR(120) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  rol ENUM('admin', 'empleado', 'cliente') NOT NULL DEFAULT 'cliente',
  activo TINYINT(1) NOT NULL DEFAULT 1,
  fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categorias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(120) NOT NULL,
  descripcion TEXT,
  precio DECIMAL(10,2) NOT NULL,
  stock INT NOT NULL DEFAULT 0,
  categoria_id INT NULL,
  proveedor VARCHAR(120),
  activo TINYINT(1) NOT NULL DEFAULT 1,
  fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

CREATE TABLE clientes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(120) NOT NULL,
  telefono VARCHAR(30),
  correo VARCHAR(120),
  direccion TEXT,
  fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ventas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  cliente_id INT NULL,
  total DECIMAL(10,2) NOT NULL,
  tipo ENUM('mostrador', 'pide_y_recoge') NOT NULL DEFAULT 'mostrador',
  estado ENUM('Pendiente', 'Preparando', 'Listo para recoger', 'Entregado', 'Cancelado') NOT NULL DEFAULT 'Pendiente',
  fecha_venta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
  FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

CREATE TABLE detalle_ventas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  venta_id INT NOT NULL,
  producto_id INT NOT NULL,
  cantidad INT NOT NULL,
  precio_unitario DECIMAL(10,2) NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (venta_id) REFERENCES ventas(id),
  FOREIGN KEY (producto_id) REFERENCES productos(id)
);

CREATE TABLE servicios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cliente_id INT NULL,
  usuario_id INT NULL,
  tipo_servicio VARCHAR(120) NOT NULL,
  descripcion TEXT NOT NULL,
  estado ENUM('Pendiente', 'En proceso', 'Terminado', 'Entregado', 'Cancelado') NOT NULL DEFAULT 'Pendiente',
  costo DECIMAL(10,2) DEFAULT 0,
  fecha_recepcion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  fecha_entrega DATE NULL,
  observaciones TEXT,
  FOREIGN KEY (cliente_id) REFERENCES clientes(id),
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

INSERT INTO categorias (nombre) VALUES
('Escolar'),
('Oficina'),
('Impresion'),
('Tecnologia'),
('Servicios');
