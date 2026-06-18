import { useEffect, useState } from 'react';
import { getSalesRequest } from '../api/generalApi';

export default function Sales() {
  const [sales, setSales] = useState([]);
  useEffect(() => { getSalesRequest().then((res) => setSales(res.data.sales)).catch(() => null); }, []);
  return (
    <div>
      <span className="tag">Ventas</span>
      <h1>Ventas y pedidos</h1>
      <div className="table-card"><table><thead><tr><th>ID</th><th>Usuario</th><th>Cliente</th><th>Tipo</th><th>Total</th><th>Estado</th></tr></thead><tbody>{sales.map((s) => <tr key={s.id}><td>{s.id}</td><td>{s.usuario}</td><td>{s.cliente || 'Público/cliente web'}</td><td>{s.tipo}</td><td>${Number(s.total).toFixed(2)}</td><td>{s.estado}</td></tr>)}</tbody></table></div>
    </div>
  );
}
