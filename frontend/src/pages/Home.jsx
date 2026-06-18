import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Home() {
  const { products, loading } = useProducts({});
  const { user } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleBuy = (product) => {
    if (!user) {
      navigate('/register', { state: { message: 'Crea una cuenta o inicia sesion para comprar en modo pide y recoge.' } });
      return;
    }
    if (user.rol !== 'cliente') {
      navigate('/dashboard/productos');
      return;
    }
    addToCart(product);
    navigate('/dashboard/carrito');
  };

  const handleService = () => {
    if (!user) {
      navigate('/register', { state: { message: 'Para solicitar un servicio primero debes registrarte o iniciar sesion.' } });
      return;
    }
    if (user.rol === 'cliente') navigate('/dashboard/solicitar-servicio');
    else navigate('/dashboard/servicios');
  };

  return (
    <>
      <Navbar />
      <section className="hero dynamic-hero">
        <div>
          <span className="tag">Papelería · ventas · inventario · mantenimientos</span>
          <h1>Sistema web para administrar una papelería de forma profesional.</h1>
          <p>PapelTech permite vender productos, controlar inventario, solicitar servicios y usar la modalidad <strong>pide y recoge</strong>.</p>
          <div className="hero-actions">
            <Link className="btn" to="/productos">Explorar productos</Link>
            <button className="btn ghost" onClick={handleService}>Solicitar servicio</button>
          </div>
        </div>
        <div className="hero-panel floating-panel">
          <h2>Vista pública sin login</h2>
          <p>El visitante puede navegar libremente productos y servicios.</p>
          <div className="mini-grid">
            <span>🛒 Pide y recoge</span>
            <span>🧾 Ventas</span>
            <span>📦 Inventario</span>
            <span>🔧 Mantenimientos</span>
          </div>
          <p className="muted">Al comprar o solicitar servicio se pide registro.</p>
        </div>
      </section>

      <section className="section">
        <div className="section-title">
          <h2>Productos destacados</h2>
          <Link to="/productos">Ver todos</Link>
        </div>
        {loading ? <p>Cargando productos...</p> : (
          <div className="cards-grid">
            {products.slice(0, 3).map((product) => <ProductCard key={product.id} product={product} onBuy={handleBuy} />)}
          </div>
        )}
      </section>

      <section className="section light-section">
        <h2>Servicios de la papelería</h2>
        <div className="cards-grid small">
          {['Mantenimiento de impresora', 'Engargolado', 'Impresiones y copias'].map((servicio) => (
            <article key={servicio} className="info-card">
              <h3>{servicio}</h3>
              <p>Consulta, registra y da seguimiento a servicios desde la plataforma.</p>
              <button className="btn ghost" onClick={handleService}>Solicitar</button>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
