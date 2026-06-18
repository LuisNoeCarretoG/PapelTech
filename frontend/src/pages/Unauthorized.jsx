import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Unauthorized() {
  return (
    <><Navbar /><main className="center-page"><h1>No autorizado</h1><p>No tienes permisos para entrar a esta sección.</p><Link className="btn" to="/dashboard">Volver</Link></main></>
  );
}
