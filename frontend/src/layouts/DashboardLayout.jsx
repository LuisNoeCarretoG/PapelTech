import { NavLink, Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

export default function DashboardLayout() {
  const { user } = useAuth();

  const linksByRole = {
    admin: [
      ['Resumen', '/dashboard'],
      ['Productos', '/dashboard/productos'],
      ['Clientes', '/dashboard/clientes'],
      ['Ventas', '/dashboard/ventas'],
      ['Servicios', '/dashboard/servicios'],
      ['Usuarios', '/dashboard/usuarios'],
      ['Perfil', '/dashboard/perfil']
    ],
    empleado: [
      ['Resumen', '/dashboard'],
      ['Productos activos', '/dashboard/productos'],
      ['Clientes', '/dashboard/clientes'],
      ['Ventas', '/dashboard/ventas'],
      ['Servicios registrados', '/dashboard/servicios'],
      ['Perfil', '/dashboard/perfil']
    ],
    cliente: [
      ['Resumen', '/dashboard'],
      ['Productos', '/dashboard/productos'],
      ['Servicios', '/dashboard/solicitar-servicio'],
      ['Carrito', '/dashboard/carrito'],
      ['Perfil', '/dashboard/perfil']
    ]
  };

  const links = linksByRole[user?.rol] || [];

  return (
    <>
      <Navbar />
      <main className="dashboard-shell">
        <aside className="sidebar">
          <h2>PapelTech</h2>
          <p>Gestión de papelería</p>
          <div className="side-links">
            {links.map(([label, to]) => <NavLink key={to} to={to} end>{label}</NavLink>)}
          </div>
        </aside>
        <section className="dashboard-content">
          <Outlet />
        </section>
      </main>
    </>
  );
}
