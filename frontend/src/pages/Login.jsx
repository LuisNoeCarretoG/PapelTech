import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Alert from '../components/Alert';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [form, setForm] = useState({ correo: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al iniciar sesion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="auth-page">
        <form className="form-card" onSubmit={handleSubmit}>
          <h1>Iniciar sesión</h1>
          <Alert type="error">{error}</Alert>
          <label>Correo</label>
          <input name="correo" value={form.correo} onChange={handleChange} placeholder="admin@papeltech.com" />
          <label>Contraseña</label>
          <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Admin123*" />
          <button className="btn" disabled={loading}>{loading ? 'Entrando...' : 'Entrar'}</button>
          <p>¿No tienes cuenta? <Link to="/register">Crear cuenta</Link></p>
        </form>
      </main>
    </>
  );
}
