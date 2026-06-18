import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Alert from '../components/Alert';
import { getProductRequest } from '../api/productsApi';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    getProductRequest(id)
      .then((res) => setProduct(res.data.product))
      .catch(() => setError('Producto no encontrado'));
  }, [id]);

  const handleBuy = () => {
    if (!user) return navigate('/register', { state: { message: 'Regístrate para comprar este producto.' } });
    if (user.rol !== 'cliente') return navigate('/dashboard/productos');
    addToCart(product);
    navigate('/dashboard/carrito');
  };

  return (
    <>
      <Navbar />
      <main className="section">
        <Alert type="error">{error}</Alert>
        {product && (
          <article className="detail-card">
            <span className="tag">{product.categoria}</span>
            <h1>{product.nombre}</h1>
            <p>{product.descripcion}</p>
            <h2>${Number(product.precio).toFixed(2)}</h2>
            <p>Stock disponible: {product.stock}</p>
            <button className="btn" onClick={handleBuy}>Comprar en pide y recoge</button>
          </article>
        )}
      </main>
    </>
  );
}
