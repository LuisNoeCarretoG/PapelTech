import { useEffect, useState } from 'react';
import { getUsersRequest } from '../api/generalApi';

export default function Users() {
  const [users, setUsers] = useState([]);
  useEffect(() => { getUsersRequest().then((res) => setUsers(res.data.users)).catch(() => null); }, []);
  return (
    <div>
      <span className="tag">Admin</span>
      <h1>Usuarios del sistema</h1>
      <div className="table-card"><table><thead><tr><th>Nombre</th><th>Correo</th><th>Rol</th><th>Activo</th></tr></thead><tbody>{users.map((u) => <tr key={u.id}><td>{u.nombre}</td><td>{u.correo}</td><td>{u.rol}</td><td>{u.activo ? 'Sí' : 'No'}</td></tr>)}</tbody></table></div>
    </div>
  );
}
