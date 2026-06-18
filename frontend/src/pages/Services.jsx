import { useEffect, useState } from 'react';
import Alert from '../components/Alert';
import { getServicesRequest, updateServiceRequest } from '../api/generalApi';

export default function Services() {
  const [services, setServices] = useState([]);
  const [message, setMessage] = useState('');
  const load = () => getServicesRequest().then((res) => setServices(res.data.services));
  useEffect(() => { load().catch(() => null); }, []);
  const changeStatus = async (service, estado) => {
    await updateServiceRequest(service.id, { estado, costo: service.costo, observaciones: service.observaciones });
    setMessage('Estado actualizado correctamente');
    load();
  };
  return (
    <div>
      <span className="tag">Servicios</span>
      <h1>Servicios registrados</h1>
      <Alert>{message}</Alert>
      <div className="cards-grid">
        {services.map((s) => (
          <article className="info-card" key={s.id}>
            <h3>{s.tipo_servicio}</h3><p>{s.descripcion}</p><p><strong>Estado:</strong> {s.estado}</p><p><strong>Costo:</strong> ${Number(s.costo || 0).toFixed(2)}</p>
            <select value={s.estado} onChange={(e) => changeStatus(s, e.target.value)}>
              {['Pendiente','En proceso','Terminado','Entregado','Cancelado'].map((x) => <option key={x}>{x}</option>)}
            </select>
          </article>
        ))}
      </div>
    </div>
  );
}
