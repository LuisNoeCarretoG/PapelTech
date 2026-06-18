const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/products.routes');
const clientRoutes = require('./routes/clients.routes');
const saleRoutes = require('./routes/sales.routes');
const serviceRoutes = require('./routes/services.routes');
const userRoutes = require('./routes/users.routes');

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    ok: true,
    message: 'API PapelTech funcionando correctamente',
    modules: ['auth', 'products', 'clients', 'sales', 'services', 'users']
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/sales', saleRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/users', userRoutes);

app.use((req, res) => {
  res.status(404).json({ ok: false, message: 'Ruta no encontrada' });
});

app.use((error, req, res, next) => {
  console.error('Error interno:', error.message);
  res.status(error.status || 500).json({
    ok: false,
    message: error.message || 'Error interno del servidor'
  });
});

module.exports = app;
