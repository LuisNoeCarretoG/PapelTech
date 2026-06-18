import Alert from '../components/Alert';
import { createSaleRequest } from '../api/generalApi';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

export default function Cart() {
  const { items, updateQuantity, removeFromCart, clearCart, total } = useCart();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const confirmOrder = async () => {
    setMessage('');
    setError('');
    if (items.length === 0) return setError('Tu carrito esta vacio');
    setLoading(true);
    try {
      await createSaleRequest({
        tipo: 'pide_y_recoge',
        items: items.map((item) => ({ producto_id: item.id, cantidad: item.cantidad }))
      });
      clearCart();
      setMessage('Pedido registrado correctamente. Puedes pasar a recogerlo cuando esté listo.');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al confirmar pedido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <span className="tag">Cliente</span>
      <h1>Carrito pide y recoge</h1>
      <Alert>{message}</Alert>
      <Alert type="error">{error}</Alert>
      {items.length === 0 ? <p>No hay productos en el carrito.</p> : (
        <div className="table-card">
          <table>
            <thead><tr><th>Producto</th><th>Cantidad</th><th>Precio</th><th>Subtotal</th><th></th></tr></thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.nombre}</td>
                  <td><input className="small-input" type="number" min="1" value={item.cantidad} onChange={(e) => updateQuantity(item.id, e.target.value)} /></td>
                  <td>${Number(item.precio).toFixed(2)}</td>
                  <td>${(Number(item.precio) * Number(item.cantidad)).toFixed(2)}</td>
                  <td><button className="btn danger" onClick={() => removeFromCart(item.id)}>Quitar</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <h2>Total: ${total.toFixed(2)}</h2>
          <button className="btn" onClick={confirmOrder} disabled={loading}>{loading ? 'Registrando...' : 'Confirmar pedido'}</button>
        </div>
      )}
    </div>
  );
}
