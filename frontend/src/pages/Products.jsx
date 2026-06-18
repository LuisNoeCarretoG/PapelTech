import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Modal from '../components/Modal';
import Alert from '../components/Alert';
import { useProducts } from '../hooks/useProducts';
import { createProductRequest, deleteProductRequest, updateProductRequest } from '../api/productsApi';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const initialForm = { nombre: '', descripcion: '', precio: '', stock: '', categoria_id: 1, proveedor: '' };

export default function Products() {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const search = params.get('search') || '';
  const [localSearch, setLocalSearch] = useState(search);
  const searchRef = useRef(null);
  const { products, loading, error, setProducts } = useProducts({ search });
  const [form, setForm] = useState(initialForm);
  const [editing, setEditing] = useState(null);
  const [message, setMessage] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);

  const canManage = user.rol === 'admin';

  useEffect(() => {
    const timeout = setTimeout(() => {
      setParams(localSearch ? { search: localSearch } : {});
    }, 500);
    return () => clearTimeout(timeout);
  }, [localSearch, setParams]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      if (editing) {
        await updateProductRequest(editing.id, form);
        setMessage('Producto actualizado correctamente');
      } else {
        await createProductRequest(form);
        setMessage('Producto creado correctamente');
      }
      const res = await import('../api/productsApi').then((m) => m.getProductsRequest({ search }));
      setProducts(res.data.products);
      setForm(initialForm);
      setEditing(null);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error al guardar producto');
    }
  };

  const handleEdit = (product) => {
    setEditing(product);
    setForm({
      nombre: product.nombre,
      descripcion: product.descripcion || '',
      precio: product.precio,
      stock: product.stock,
      categoria_id: product.categoria_id || 1,
      proveedor: product.proveedor || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const confirmDelete = async () => {
    try {
      await deleteProductRequest(deleteTarget.id);
      setProducts(products.filter((p) => p.id !== deleteTarget.id));
      setMessage('Producto eliminado correctamente');
      setDeleteTarget(null);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error al eliminar producto');
    }
  };

  const handleBuy = (product) => {
    if (user.rol !== 'cliente') return;
    addToCart(product);
    navigate('/dashboard/carrito');
  };

  return (
    <div>
      <span className="tag">Productos</span>
      <h1>{canManage ? 'Administrar inventario' : 'Productos activos'}</h1>
      <Alert>{message}</Alert>
      <Alert type="error">{error}</Alert>

      <div className="toolbar">
        <input ref={searchRef} value={localSearch} onChange={(e) => setLocalSearch(e.target.value)} placeholder="Buscar productos con debounce" />
      </div>

      {canManage && (
        <form className="form-grid" onSubmit={handleSubmit}>
          <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" />
          <input name="precio" value={form.precio} onChange={handleChange} placeholder="Precio" type="number" step="0.01" />
          <input name="stock" value={form.stock} onChange={handleChange} placeholder="Stock" type="number" />
          <input name="proveedor" value={form.proveedor} onChange={handleChange} placeholder="Proveedor" />
          <textarea name="descripcion" value={form.descripcion} onChange={handleChange} placeholder="Descripción" />
          <button className="btn">{editing ? 'Guardar cambios' : 'Agregar producto'}</button>
        </form>
      )}

      {loading ? <p>Cargando productos...</p> : (
        <div className="cards-grid">
          {products.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onBuy={user.rol === 'cliente' ? handleBuy : null}
              canManage={canManage}
              onEdit={handleEdit}
              onDelete={setDeleteTarget}
            />
          ))}
        </div>
      )}

      <Modal open={Boolean(deleteTarget)} title="Confirmar eliminación" onClose={() => setDeleteTarget(null)} onConfirm={confirmDelete} confirmText="Eliminar">
        <p>¿Seguro que deseas eliminar <strong>{deleteTarget?.nombre}</strong>?</p>
      </Modal>
    </div>
  );
}
