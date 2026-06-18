import { useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import Alert from '../components/Alert';
import { useProducts } from '../hooks/useProducts';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function PublicProducts() {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search') || '';
  const { products, loading, error } = useProducts({ search });
  const inputRef = useRef(null);
  const [localSearch, setLocalSearch] = useState(search);
  const { user } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchParams({ search: inputRef.current.value });
  };

  const handleBuy = (product) => {
    if (!user) {
      navigate('/register', { state: { message: 'Puedes ver productos sin cuenta, pero para comprar necesitas registrarte.' } });
      return;
    }
    if (user.rol !== 'cliente') {
      navigate('/dashboard/productos');
      return;
    }
    addToCart(product);
    navigate('/dashboard/carrito');
  };

  return (
    <>
      <Navbar />
      <main className="section">
        <h1>Catálogo público de productos</h1>
        <p>El visitante puede navegar libremente. Para comprar, el sistema solicita registro.</p>
        <form className="toolbar" onSubmit={handleSearch}>
          <input ref={inputRef} value={localSearch} onChange={(e) => setLocalSearch(e.target.value)} placeholder="Buscar producto" />
          <button className="btn">Buscar</button>
        </form>
        <Alert type="error">{error}</Alert>
        {loading ? <p>Cargando productos...</p> : <div className="cards-grid">{products.map((p) => <ProductCard key={p.id} product={p} onBuy={handleBuy} />)}</div>}
      </main>
    </>
  );
}
