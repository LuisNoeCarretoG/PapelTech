import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductIcon } from '../utils/productIcon';


export default function ProductCard({ product, onBuy, canManage = false, onEdit, onDelete }) {
  return (
    <article className="product-card">
      <div className="product-icon">{getProductIcon(product)}</div>
      <p className="tag">{product.categoria || 'Producto'}</p>
      <h3>{product.nombre}</h3>
      <p>{product.descripcion}</p>
      <div className="product-meta">
        <strong>${Number(product.precio).toFixed(2)}</strong>
        <span>Stock: {product.stock}</span>
      </div>
      <div className="row-actions">
        <Link className="btn ghost" to={`/productos/${product.id}`}>Ver detalle</Link>
        {onBuy && <button className="btn" onClick={() => onBuy(product)}>Comprar</button>}
        {canManage && <button className="btn ghost" onClick={() => onEdit(product)}>Editar</button>}
        {canManage && <button className="btn danger" onClick={() => onDelete(product)}>Eliminar</button>}
      </div>
    </article>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    nombre: PropTypes.string,
    descripcion: PropTypes.string,
    precio: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    stock: PropTypes.number,
    categoria: PropTypes.string
  }).isRequired,
  onBuy: PropTypes.func,
  canManage: PropTypes.bool,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func
};
