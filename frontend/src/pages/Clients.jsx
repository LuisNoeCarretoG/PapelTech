import { useEffect, useState } from 'react';
import Alert from '../components/Alert';
import { createClientRequest, getClientsRequest } from '../api/generalApi';

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({ nombre: '', telefono: '', correo: '', direccion: '' });
  const [message, setMessage] = useState('');

  const loadClients = async () => {
    const res = await getClientsRequest();
    setClients(res.data.clients);
  };

  useEffect(() => { loadClients().catch(() => setMessage('Error al cargar clientes')); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    await createClientRequest(form);
    setMessage('Cliente registrado correctamente');
    setForm({ nombre: '', telefono: '', correo: '', direccion: '' });
    loadClients();
  };

  return (
    <div>
      <span className="tag">Clientes</span>
      <h1>Clientes registrados</h1>
      <Alert>{message}</Alert>
      <form className="form-grid" onSubmit={handleSubmit}>
        <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" />
        <input name="telefono" value={form.telefono} onChange={handleChange} placeholder="Teléfono" />
        <input name="correo" value={form.correo} onChange={handleChange} placeholder="Correo" />
        <input name="direccion" value={form.direccion} onChange={handleChange} placeholder="Dirección" />
        <button className="btn">Agregar cliente</button>
      </form>
      <div className="table-card"><table><thead><tr><th>Nombre</th><th>Teléfono</th><th>Correo</th></tr></thead><tbody>{clients.map((c) => <tr key={c.id}><td>{c.nombre}</td><td>{c.telefono}</td><td>{c.correo}</td></tr>)}</tbody></table></div>
    </div>
  );
}
