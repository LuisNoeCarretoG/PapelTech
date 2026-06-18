-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-06-2026 a las 19:57:58
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `papeltech_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id`, `nombre`) VALUES
(9, 'Arte y dibujo'),
(1, 'Escolar'),
(3, 'Impresion'),
(8, 'Impresión y copias'),
(12, 'Limpieza y oficina'),
(11, 'Mochilas y organización'),
(2, 'Oficina'),
(7, 'Papelería de oficina'),
(5, 'Servicios'),
(4, 'Tecnologia'),
(10, 'Tecnología y accesorios'),
(6, 'Útiles escolares');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id` int(11) NOT NULL,
  `nombre` varchar(120) NOT NULL,
  `telefono` varchar(30) DEFAULT NULL,
  `correo` varchar(120) DEFAULT NULL,
  `direccion` text DEFAULT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_ventas`
--

CREATE TABLE `detalle_ventas` (
  `id` int(11) NOT NULL,
  `venta_id` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio_unitario` decimal(10,2) NOT NULL,
  `subtotal` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(120) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `precio` decimal(10,2) NOT NULL,
  `stock` int(11) NOT NULL DEFAULT 0,
  `categoria_id` int(11) DEFAULT NULL,
  `proveedor` varchar(120) DEFAULT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT 1,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `descripcion`, `precio`, `stock`, `categoria_id`, `proveedor`, `activo`, `fecha_registro`, `fecha_actualizacion`) VALUES
(1, 'Cuaderno profesional raya', 'Cuaderno profesional de 100 hojas con espiral.', 45.00, 35, 6, 'Scribe', 1, '2026-06-18 16:34:48', '2026-06-18 16:34:48'),
(2, 'Cuaderno profesional cuadro grande', 'Cuaderno profesional de cuadro grande con 100 hojas.', 48.00, 30, 6, 'Scribe', 1, '2026-06-18 16:34:48', '2026-06-18 16:34:48'),
(3, 'Cuaderno profesional cuadro chico', 'Cuaderno profesional de cuadro chico para matemáticas.', 48.00, 28, 6, 'Norma', 1, '2026-06-18 16:34:48', '2026-06-18 16:34:48'),
(4, 'Cuaderno forma italiana', 'Cuaderno chico forma italiana de 100 hojas.', 32.00, 40, 6, 'Norma', 1, '2026-06-18 16:34:48', '2026-06-18 16:34:48'),
(5, 'Cuaderno forma francesa', 'Cuaderno chico forma francesa de 100 hojas.', 30.00, 38, 6, 'Scribe', 1, '2026-06-18 16:34:48', '2026-06-18 16:34:48'),
(6, 'Libreta pasta dura', 'Libreta de pasta dura para apuntes escolares.', 60.00, 20, 6, 'Estrella', 1, '2026-06-18 16:34:48', '2026-06-18 16:34:48'),
(7, 'Block de notas adhesivas', 'Notas adhesivas tipo post-it de colores.', 35.00, 45, 7, 'Post-it', 1, '2026-06-18 16:34:48', '2026-06-18 16:34:48'),
(8, 'Agenda escolar', 'Agenda escolar con calendario y separadores.', 85.00, 15, 7, 'Norma', 1, '2026-06-18 16:34:48', '2026-06-18 16:34:48'),
(9, 'Lápiz Mirado No. 2', 'Lápiz de grafito para escritura escolar.', 8.00, 150, 6, 'Dixon', 1, '2026-06-18 16:34:48', '2026-06-18 16:34:48'),
(10, 'Lápiz Dixon HB', 'Lápiz HB para dibujo y escritura.', 7.50, 130, 6, 'Dixon', 1, '2026-06-18 16:34:48', '2026-06-18 16:34:48'),
(11, 'Caja de lápices de colores 12 piezas', 'Colores escolares de madera, caja con 12 piezas.', 55.00, 35, 9, 'Maped', 1, '2026-06-18 16:34:48', '2026-06-18 16:34:48'),
(12, 'Caja de lápices de colores 24 piezas', 'Colores escolares de madera, caja con 24 piezas.', 95.00, 22, 9, 'Prismacolor', 1, '2026-06-18 16:34:48', '2026-06-18 16:34:48'),
(13, 'Crayones 12 piezas', 'Crayones escolares de colores básicos.', 40.00, 30, 9, 'Crayola', 1, '2026-06-18 16:34:48', '2026-06-18 16:34:48'),
(14, 'Marcadores de agua 12 piezas', 'Marcadores lavables para uso escolar.', 65.00, 25, 9, 'Crayola', 1, '2026-06-18 16:34:48', '2026-06-18 16:34:48'),
(15, 'Plumones permanentes', 'Marcadores permanentes color negro.', 18.00, 50, 7, 'Sharpie', 1, '2026-06-18 16:34:48', '2026-06-18 16:34:48'),
(16, 'Pluma azul Bic', 'Pluma azul punto mediano.', 10.00, 100, 6, 'Bic', 1, '2026-06-18 16:34:48', '2026-06-18 16:34:48'),
(17, 'Pluma negra Bic', 'Pluma negra punto mediano.', 10.00, 100, 6, 'Bic', 1, '2026-06-18 16:34:48', '2026-06-18 16:34:48'),
(18, 'Pluma roja Bic', 'Pluma roja punto mediano.', 10.00, 80, 6, 'Bic', 1, '2026-06-18 16:34:48', '2026-06-18 16:34:48'),
(19, 'Bolígrafo gel azul', 'Bolígrafo de gel color azul.', 18.00, 45, 7, 'Pilot', 1, '2026-06-18 16:34:48', '2026-06-18 16:34:48'),
(20, 'Bolígrafo gel negro', 'Bolígrafo de gel color negro.', 18.00, 45, 7, 'Pilot', 1, '2026-06-18 16:34:48', '2026-06-18 16:34:48'),
(21, 'Corrector líquido', 'Corrector líquido blanco para errores de escritura.', 22.00, 35, 7, 'Bic', 1, '2026-06-18 16:34:48', '2026-06-18 16:34:48'),
(22, 'Corrector en cinta', 'Corrector en cinta de uso rápido.', 28.00, 30, 7, 'Kores', 1, '2026-06-18 16:34:48', '2026-06-18 16:34:48'),
(23, 'Borrador blanco', 'Borrador blanco escolar.', 7.00, 120, 6, 'Pelikan', 1, '2026-06-18 16:34:48', '2026-06-18 16:34:48'),
(24, 'Sacapuntas metálico', 'Sacapuntas metálico de una entrada.', 8.00, 100, 6, 'Maped', 1, '2026-06-18 16:34:48', '2026-06-18 16:34:48'),
(25, 'Sacapuntas con depósito', 'Sacapuntas plástico con depósito.', 15.00, 60, 6, 'Maped', 1, '2026-06-18 16:34:48', '2026-06-18 16:34:48'),
(26, 'Regla de 30 cm', 'Regla transparente de 30 centímetros.', 18.00, 70, 6, 'Maped', 1, '2026-06-18 16:34:48', '2026-06-18 16:34:48'),
(27, 'Juego de geometría', 'Juego de geometría con regla, escuadras, transportador y compás.', 55.00, 35, 6, 'Maped', 1, '2026-06-18 16:34:48', '2026-06-18 16:34:48'),
(28, 'Compás escolar', 'Compás metálico para dibujo técnico.', 38.00, 28, 6, 'Maped', 1, '2026-06-18 16:34:48', '2026-06-18 16:34:48'),
(29, 'Pegamento en barra chico', 'Pegamento adhesivo en barra de 10 gramos.', 14.00, 90, 6, 'Pritt', 1, '2026-06-18 16:34:48', '2026-06-18 16:34:48'),
(30, 'Pegamento en barra grande', 'Pegamento adhesivo en barra de 40 gramos.', 35.00, 50, 6, 'Pritt', 1, '2026-06-18 16:34:48', '2026-06-18 16:34:48'),
(31, 'Resistol blanco 850', 'Pegamento blanco escolar de 110 gramos.', 28.00, 60, 6, 'Resistol', 1, '2026-06-18 16:34:48', '2026-06-18 16:34:48'),
(32, 'Cinta adhesiva transparente', 'Cinta adhesiva transparente para oficina.', 18.00, 75, 7, 'Janel', 1, '2026-06-18 16:34:48', '2026-06-18 16:34:48'),
(33, 'Cinta masking tape', 'Cinta masking tape para trabajos escolares.', 30.00, 40, 7, 'Janel', 1, '2026-06-18 16:34:48', '2026-06-18 16:34:48'),
(34, 'Cinta doble cara', 'Cinta adhesiva doble cara.', 35.00, 25, 7, 'Janel', 1, '2026-06-18 16:34:48', '2026-06-18 16:34:48'),
(35, 'Folder tamaño carta', 'Folder manila tamaño carta.', 5.00, 180, 7, 'Office Depot', 1, '2026-06-18 16:34:48', '2026-06-18 16:34:48'),
(36, 'Folder tamaño oficio', 'Folder manila tamaño oficio.', 6.00, 120, 7, 'Office Depot', 1, '2026-06-18 16:34:48', '2026-06-18 16:34:48'),
(37, 'Carpeta de argollas 1 pulgada', 'Carpeta blanca de tres argollas.', 55.00, 30, 7, 'Wilson Jones', 1, '2026-06-18 16:34:48', '2026-06-18 16:34:48'),
(38, 'Carpeta de argollas 2 pulgadas', 'Carpeta de tres argollas para archivo.', 75.00, 20, 7, 'Wilson Jones', 1, '2026-06-18 16:34:48', '2026-06-18 16:34:48'),
(39, 'Separadores de colores', 'Separadores para carpeta con pestañas.', 25.00, 45, 7, 'Norma', 1, '2026-06-18 16:34:48', '2026-06-18 16:34:48'),
(40, 'Protectores de hojas', 'Paquete de protectores plásticos tamaño carta.', 65.00, 35, 7, 'Office Depot', 1, '2026-06-18 16:34:48', '2026-06-18 16:34:48'),
(41, 'Paquete de hojas blancas carta', 'Paquete de 500 hojas blancas tamaño carta.', 110.00, 45, 8, 'Chamex', 1, '2026-06-18 16:34:48', '2026-06-18 16:34:48'),
(42, 'Paquete de hojas blancas oficio', 'Paquete de 500 hojas blancas tamaño oficio.', 135.00, 25, 8, 'Chamex', 1, '2026-06-18 16:34:48', '2026-06-18 16:34:48'),
(43, 'Cartulina blanca', 'Cartulina blanca escolar.', 8.00, 100, 9, 'Genérico', 1, '2026-06-18 16:34:48', '2026-06-18 16:34:48'),
(44, 'Cartulina de color', 'Cartulina de colores surtidos.', 10.00, 90, 9, 'Genérico', 1, '2026-06-18 16:34:48', '2026-06-18 16:34:48'),
(45, 'Papel bond por hoja', 'Hoja de papel bond tamaño carta.', 1.00, 1000, 8, 'Chamex', 1, '2026-06-18 16:34:48', '2026-06-18 16:34:48'),
(46, 'Papel opalina', 'Hoja opalina blanca tamaño carta.', 4.00, 300, 8, 'Genérico', 1, '2026-06-18 16:34:48', '2026-06-18 16:34:48'),
(47, 'Papel fotográfico', 'Hoja de papel fotográfico brillante.', 8.00, 200, 8, 'Epson', 1, '2026-06-18 16:34:48', '2026-06-18 16:34:48'),
(48, 'Tijeras escolares', 'Tijeras escolares punta redonda.', 25.00, 50, 6, 'Maped', 1, '2026-06-18 16:34:48', '2026-06-18 16:34:48'),
(49, 'Tijeras de oficina', 'Tijeras grandes para oficina.', 45.00, 30, 7, 'Barrilito', 1, '2026-06-18 16:34:48', '2026-06-18 16:34:48'),
(50, 'Engrapadora pequeña', 'Engrapadora metálica pequeña.', 55.00, 25, 7, 'Pegaso', 1, '2026-06-18 16:34:48', '2026-06-18 16:34:48'),
(51, 'Caja de grapas', 'Caja de grapas estándar.', 18.00, 80, 7, 'Pegaso', 1, '2026-06-18 16:34:48', '2026-06-18 16:34:48'),
(52, 'Clips metálicos', 'Caja de clips metálicos.', 15.00, 90, 7, 'Barrilito', 1, '2026-06-18 16:34:48', '2026-06-18 16:34:48'),
(53, 'Broches Baco', 'Broches Baco para archivo.', 20.00, 65, 7, 'Baco', 1, '2026-06-18 16:34:48', '2026-06-18 16:34:48'),
(54, 'Ligas de hule', 'Bolsa de ligas de hule.', 18.00, 50, 7, 'Genérico', 1, '2026-06-18 16:34:48', '2026-06-18 16:34:48'),
(55, 'Sobre bolsa tamaño carta', 'Sobre bolsa amarillo tamaño carta.', 7.00, 100, 7, 'Genérico', 1, '2026-06-18 16:34:48', '2026-06-18 16:34:48'),
(56, 'Sobre bolsa tamaño oficio', 'Sobre bolsa amarillo tamaño oficio.', 8.00, 90, 7, 'Genérico', 1, '2026-06-18 16:34:48', '2026-06-18 16:34:48'),
(57, 'Etiqueta adhesiva blanca', 'Paquete de etiquetas adhesivas blancas.', 35.00, 40, 7, 'Avery', 1, '2026-06-18 16:34:48', '2026-06-18 16:34:48'),
(58, 'Notas adhesivas colores', 'Notas adhesivas en colores surtidos.', 32.00, 45, 7, 'Post-it', 1, '2026-06-18 16:34:48', '2026-06-18 16:34:48'),
(59, 'Memoria USB 32GB', 'Memoria USB de 32GB para archivos escolares.', 120.00, 20, 10, 'Kingston', 1, '2026-06-18 16:34:48', '2026-06-18 16:34:48'),
(60, 'Memoria USB 64GB', 'Memoria USB de 64GB para documentos y respaldos.', 170.00, 15, 10, 'Kingston', 1, '2026-06-18 16:34:48', '2026-06-18 16:34:48'),
(61, 'Mouse USB básico', 'Mouse alámbrico USB para computadora.', 95.00, 18, 10, 'Logitech', 1, '2026-06-18 16:34:48', '2026-06-18 16:34:48'),
(62, 'Teclado USB básico', 'Teclado alámbrico USB para oficina.', 160.00, 10, 10, 'Logitech', 1, '2026-06-18 16:34:48', '2026-06-18 16:34:48'),
(63, 'Cable USB tipo C', 'Cable USB tipo C para carga y datos.', 75.00, 25, 10, 'Genérico', 1, '2026-06-18 16:34:48', '2026-06-18 16:34:48'),
(64, 'Audífonos básicos', 'Audífonos alámbricos para computadora o celular.', 90.00, 20, 10, 'Genérico', 1, '2026-06-18 16:34:48', '2026-06-18 16:34:48'),
(65, 'Mochila escolar básica', 'Mochila escolar con compartimiento principal.', 280.00, 12, 11, 'Genérico', 1, '2026-06-18 16:34:48', '2026-06-18 16:34:48'),
(66, 'Lapicera escolar', 'Lapicera para lápices, plumas y colores.', 65.00, 30, 11, 'Genérico', 1, '2026-06-18 16:34:48', '2026-06-18 16:34:48'),
(67, 'Organizador de escritorio', 'Organizador plástico para escritorio.', 95.00, 15, 11, 'Genérico', 1, '2026-06-18 16:34:48', '2026-06-18 16:34:48'),
(68, 'Portaminas 0.5', 'Portaminas de 0.5 mm para escritura fina.', 25.00, 40, 6, 'Pentel', 1, '2026-06-18 16:34:48', '2026-06-18 16:34:48'),
(69, 'Minas 0.5', 'Tubo de minas 0.5 mm.', 18.00, 50, 6, 'Pentel', 1, '2026-06-18 16:34:48', '2026-06-18 16:34:48'),
(70, 'Impresión blanco y negro', 'Servicio de impresión en blanco y negro por hoja.', 2.00, 999, 8, 'Servicio interno', 1, '2026-06-18 16:34:48', '2026-06-18 16:34:48'),
(71, 'Impresión a color', 'Servicio de impresión a color por hoja.', 8.00, 999, 8, 'Servicio interno', 1, '2026-06-18 16:34:48', '2026-06-18 16:34:48'),
(72, 'Copia blanco y negro', 'Servicio de copia en blanco y negro por hoja.', 1.50, 999, 8, 'Servicio interno', 1, '2026-06-18 16:34:48', '2026-06-18 16:34:48'),
(73, 'Engargolado básico', 'Servicio de engargolado tamaño carta.', 35.00, 999, 8, 'Servicio interno', 1, '2026-06-18 16:34:48', '2026-06-18 16:34:48'),
(74, 'Enmicado tamaño carta', 'Servicio de enmicado tamaño carta.', 25.00, 999, 8, 'Servicio interno', 1, '2026-06-18 16:34:48', '2026-06-18 16:34:48');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicios`
--

CREATE TABLE `servicios` (
  `id` int(11) NOT NULL,
  `cliente_id` int(11) DEFAULT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `tipo_servicio` varchar(120) NOT NULL,
  `descripcion` text NOT NULL,
  `estado` enum('Pendiente','En proceso','Terminado','Entregado','Cancelado') NOT NULL DEFAULT 'Pendiente',
  `costo` decimal(10,2) DEFAULT 0.00,
  `fecha_recepcion` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_entrega` date DEFAULT NULL,
  `observaciones` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(120) NOT NULL,
  `correo` varchar(120) NOT NULL,
  `password` varchar(255) NOT NULL,
  `rol` enum('admin','empleado','cliente') NOT NULL DEFAULT 'cliente',
  `activo` tinyint(1) NOT NULL DEFAULT 1,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas`
--

CREATE TABLE `ventas` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `cliente_id` int(11) DEFAULT NULL,
  `total` decimal(10,2) NOT NULL,
  `tipo` enum('mostrador','pide_y_recoge') NOT NULL DEFAULT 'mostrador',
  `estado` enum('Pendiente','Preparando','Listo para recoger','Entregado','Cancelado') NOT NULL DEFAULT 'Pendiente',
  `fecha_venta` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `detalle_ventas`
--
ALTER TABLE `detalle_ventas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `venta_id` (`venta_id`),
  ADD KEY `producto_id` (`producto_id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoria_id` (`categoria_id`);

--
-- Indices de la tabla `servicios`
--
ALTER TABLE `servicios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cliente_id` (`cliente_id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `correo` (`correo`);

--
-- Indices de la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`),
  ADD KEY `cliente_id` (`cliente_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `detalle_ventas`
--
ALTER TABLE `detalle_ventas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT de la tabla `servicios`
--
ALTER TABLE `servicios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `ventas`
--
ALTER TABLE `ventas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detalle_ventas`
--
ALTER TABLE `detalle_ventas`
  ADD CONSTRAINT `detalle_ventas_ibfk_1` FOREIGN KEY (`venta_id`) REFERENCES `ventas` (`id`),
  ADD CONSTRAINT `detalle_ventas_ibfk_2` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`);

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`);

--
-- Filtros para la tabla `servicios`
--
ALTER TABLE `servicios`
  ADD CONSTRAINT `servicios_ibfk_1` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`),
  ADD CONSTRAINT `servicios_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD CONSTRAINT `ventas_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `ventas_ibfk_2` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
