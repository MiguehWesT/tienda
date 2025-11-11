import React from 'react';
import { useApp } from '../../context/AppContext';
import Badge from '../../components/atoms/Badge';

const AdminUsers = () => {
  const { users, setUsers } = useApp();

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const toggleRole = (user) => {
    setUsers(users.map(u => 
      u.id === user.id 
        ? {...u, role: u.role === 'admin' ? 'user' : 'admin'} 
        : u
    ));
  };

  return (
    <div className="admin-section">
      <h2>Gestión de Usuarios</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <Badge variant={user.role === 'admin' ? 'success' : 'default'}>
                  {user.role}
                </Badge>
              </td>
              <td>
                <button className="btn-icon" onClick={() => toggleRole(user)}>🔄</button>
                <button className="btn-icon" onClick={() => handleDelete(user.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;