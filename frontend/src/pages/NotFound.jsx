import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function NotFound() {
  return (
    <><Navbar /><main className="center-page"><h1>Error 404</h1><p>La ruta solicitada no existe.</p><Link className="btn" to="/">Ir al inicio</Link></main></>
  );
}
