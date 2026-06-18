import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

export default function PublicServices() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleRequest = () => {
    if (!user) return navigate('/register', { state: { message: 'Puedes ver los servicios sin cuenta, pero para solicitarlos debes registrarte.' } });
    if (user.rol === 'cliente') return navigate('/dashboard/solicitar-servicio');
    return navigate('/dashboard/servicios');
  };

  const services = ['Mantenimiento de impresoras', 'Mantenimiento básico de computadoras', 'Copias e impresiones', 'Engargolado', 'Trabajos escolares'];

  return (
    <>
      <Navbar />
      <main className="section">
        <h1>Servicios públicos</h1>
        <p>El visitante puede ver todos los servicios. Al solicitar uno, debe registrarse.</p>
        <div className="cards-grid small">
          {services.map((s) => (
            <article className="info-card" key={s}>
              <h3>{s}</h3>
              <p>Servicio disponible para clientes registrados.</p>
              <button className="btn" onClick={handleRequest}>Solicitar servicio</button>
            </article>
          ))}
        </div>
      </main>
    </>
  );
}
