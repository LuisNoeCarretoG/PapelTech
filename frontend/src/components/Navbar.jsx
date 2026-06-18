import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="topbar">
      <Link className="brand" to="/">PapelTech</Link>
      <div className="top-links">
        <NavLink to="/productos">Productos</NavLink>
        <NavLink to="/servicios-publicos">Servicios</NavLink>
        {user ? (
          <>
            <span className="pill">{user.nombre} · {user.rol}</span>
            {user.rol === 'cliente' && <NavLink to="/dashboard/carrito">Carrito ({items.length})</NavLink>}
            <NavLink to="/dashboard">Dashboard</NavLink>
            <button className="btn ghost" onClick={handleLogout}>Cerrar sesión</button>
          </>
        ) : (
          <>
           <Link to="/login" className="nav-btn">Entrar</Link>
<Link to="/register" className="nav-btn">Crear cuenta</Link>
          </>
        )}
      </div>
    </nav>
  );
}
