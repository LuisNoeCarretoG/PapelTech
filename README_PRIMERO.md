# PapelTech - Proyecto unificado

Este ZIP ya viene en una sola carpeta con:

- `backend`: Node.js + Express + MySQL + JWT
- `frontend`: React + Vite + React Router + Axios

## Roles incluidos

| Rol | Correo | Contraseña | Qué ve |
|---|---|---|---|
| Admin | admin@papeltech.com | Admin123* | Todo: productos, clientes, ventas, servicios, usuarios |
| Empleado | empleado1@papeltech.com | Empleado123* | Productos activos, clientes, ventas y servicios |
| Cliente | cliente@papeltech.com | Cliente123* | Productos, servicios, carrito y perfil |

## Visitante sin login

El visitante puede navegar productos y servicios libremente. Si intenta comprar o solicitar un servicio, se manda a registro/login.

## Pasos para ejecutar

### 1. Backend

Abrir PowerShell en:

```powershell
cd "C:\Users\gomez\Downloads\PapelTech_Unificado_100\backend"
```

Instalar:

```powershell
npm install
```

Crear archivo `.env` copiando `.env.example`.

Ejemplo:

```env
PORT=4000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=papeltech_db
DB_PORT=3306
JWT_SECRET=papeltech_clave_secreta_cambiar_en_produccion
JWT_EXPIRES_IN=8h
FRONTEND_URL=http://localhost:5173
```

Si MySQL tiene contraseña, ponerla en `DB_PASSWORD`.

### 2. Crear base de datos

En phpMyAdmin entrar a SQL y ejecutar todo el archivo:

```txt
backend/database/schema.sql
```

Este archivo BORRA y CREA la base `papeltech_db`, así que úsalo para reiniciar limpio.

### 3. Insertar datos iniciales

```powershell
npm run db:seed
```

### 4. Levantar backend

```powershell
npm run dev
```

Debe aparecer:

```txt
Servidor PapelTech ejecutandose en http://localhost:4000
```

### 5. Frontend

Abrir otra terminal en:

```powershell
cd "C:\Users\gomez\Downloads\PapelTech_Unificado_100\frontend"
```

Instalar:

```powershell
npm install
```

Crear `.env` copiando `.env.example`:

```env
VITE_API_URL=http://localhost:4000/api
```

Levantar:

```powershell
npm run dev
```

Abrir:

```txt
http://localhost:5173
```

## Qué demuestra para la rúbrica de Excel

- Vista pública sin login.
- Registro funcionando.
- Login funcionando.
- Vista admin.
- Vista empleado.
- Vista cliente.
- CRUD de productos para admin.
- Consulta de productos pública.
- Compra pide y recoge para cliente.
- Solicitud de servicio para cliente.
- Roles y rutas protegidas.
- React Router, rutas anidadas, NavLink y 404.
- useState, useEffect, useRef, hooks personalizados, context global.
- Axios, async/await, promesas, loading, mensajes de éxito/error.
- Props y PropTypes.
- Modal reutilizable.
- Buscador con debounce y query params.
