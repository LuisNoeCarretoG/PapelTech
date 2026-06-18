import { useState } from 'react';
import Alert from '../components/Alert';
import { createServiceRequest } from '../api/generalApi';

export default function ServiceRequest() {
  const [form, setForm] = useState({ tipo_servicio: '', descripcion: '', observaciones: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setError('');
    try {
      await createServiceRequest(form);
      setMessage('Servicio solicitado correctamente. La papelería revisará tu solicitud.');
      setForm({ tipo_servicio: '', descripcion: '', observaciones: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Error al solicitar servicio');
    }
  };

  return (
    <div>
      <span className="tag">Cliente</span>
      <h1>Solicitar servicio</h1>
      <p>Registra un mantenimiento, impresión, engargolado o trabajo especial.</p>
      <Alert>{message}</Alert>
      <Alert type="error">{error}</Alert>
      <form className="form-card inline" onSubmit={handleSubmit}>
        <label>Tipo de servicio</label>
        <input name="tipo_servicio" value={form.tipo_servicio} onChange={handleChange} placeholder="Mantenimiento de impresora" />
        <label>Descripción</label>
        <textarea name="descripcion" value={form.descripcion} onChange={handleChange} placeholder="Describe lo que necesitas" />
        <label>Observaciones</label>
        <textarea name="observaciones" value={form.observaciones} onChange={handleChange} placeholder="Fecha deseada, detalles, etc." />
        <button className="btn">Solicitar servicio</button>
      </form>
    </div>
  );
}
