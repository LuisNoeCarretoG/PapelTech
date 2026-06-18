import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user } = useAuth();
  return (
    <div>
      <span className="tag">Perfil</span>
      <h1>Mis datos</h1>
      <div className="detail-card">
        <p><strong>Nombre:</strong> {user.nombre}</p>
        <p><strong>Correo:</strong> {user.correo}</p>
        <p><strong>Rol:</strong> {user.rol}</p>
      </div>
    </div>
  );
}
