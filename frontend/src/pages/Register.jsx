import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Alert from '../components/Alert';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const location = useLocation();
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({ nombre: '', correo: '', password: '', rol: 'cliente' });
  const [message, setMessage] = useState(location.state?.message || '');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await register(form);
      setMessage(res.message || 'Usuario registrado correctamente');
      setTimeout(() => navigate('/login'), 900);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al registrar usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="auth-page">
        <form className="form-card" onSubmit={handleSubmit}>
          <h1>Crear cuenta</h1>
          <Alert>{message}</Alert>
          <Alert type="error">{error}</Alert>
          <label>Nombre</label>
          <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Tu nombre" />
          <label>Correo</label>
          <input name="correo" value={form.correo} onChange={handleChange} placeholder="cliente@mail.com" />
          <label>Contraseña</label>
          <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Cliente123*" />
          <input type="hidden" name="rol" value="cliente" />
          <button className="btn" disabled={loading}>{loading ? 'Registrando...' : 'Registrarme como cliente'}</button>
          <p>¿Ya tienes cuenta? <Link to="/login">Entrar</Link></p>
        </form>
      </main>
    </>
  );
}
