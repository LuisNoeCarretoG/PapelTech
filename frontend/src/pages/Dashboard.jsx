import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getProductsRequest } from '../api/productsApi';
import { getClientsRequest, getServicesRequest, getSalesRequest } from '../api/generalApi';

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ products: 0, clients: 0, services: 0, sales: 0 });

  useEffect(() => {
    getProductsRequest().then((res) => setStats((s) => ({ ...s, products: res.data.products.length }))).catch(() => null);
    if (['admin', 'empleado'].includes(user.rol)) {
      getClientsRequest().then((res) => setStats((s) => ({ ...s, clients: res.data.clients.length }))).catch(() => null);
      getServicesRequest().then((res) => setStats((s) => ({ ...s, services: res.data.services.length }))).catch(() => null);
      getSalesRequest().then((res) => setStats((s) => ({ ...s, sales: res.data.sales.length }))).catch(() => null);
    }
  }, [user.rol]);

  const roleText = {
    admin: 'Tienes acceso completo para administrar productos, clientes, ventas, servicios y usuarios.',
    empleado: 'Puedes ver productos activos, clientes, ventas y servicios registrados.',
    cliente: 'Puedes navegar productos, solicitar servicios y usar tu carrito pide y recoge.'
  };

  return (
    <div>
      <span className="tag">Dashboard {user.rol}</span>
      <h1>Bienvenido, {user.nombre}</h1>
      <p>{roleText[user.rol]}</p>
      <div className="stat-grid">
        <div className="stat-card"><strong>{stats.products}</strong><span>Productos activos</span></div>
        {['admin', 'empleado'].includes(user.rol) && <div className="stat-card"><strong>{stats.clients}</strong><span>Clientes registrados</span></div>}
        {['admin', 'empleado'].includes(user.rol) && <div className="stat-card"><strong>{stats.sales}</strong><span>Ventas</span></div>}
        {['admin', 'empleado'].includes(user.rol) && <div className="stat-card"><strong>{stats.services}</strong><span>Servicios registrados</span></div>}
        {user.rol === 'cliente' && <div className="stat-card"><strong>🛒</strong><span>Carrito pide y recoge</span></div>}
        {user.rol === 'cliente' && <div className="stat-card"><strong>🔧</strong><span>Solicitud de servicios</span></div>}
      </div>
    </div>
  );
}
