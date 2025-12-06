import React from "react";
import { useApp } from "../../context/AppContext";
import Badge from "../../components/atoms/Badge";
import { deleteUsuario } from "../../api/usuariosService";

const AdminUsers = () => {
  const { users = [], setUsers } = useApp(); // users nunca será undefined

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este usuario?")) return;

    try {
      await deleteUsuario(id);

      // Actualizar lista en frontend
      setUsers(users.filter((u) => u.id !== id));

    } catch (err) {
      console.error("Error eliminando usuario:", err);
      alert("No se pudo eliminar el usuario.");
    }
  };

  const toggleRole = (user) => {
    setUsers(
      users.map((u) =>
        u.id === user.id
          ? { ...u, rol: u.rol === "admin" ? "cliente" : "admin" }
          : u
      )
    );
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
          {users.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                No hay usuarios registrados.
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>

                {/* Backend usa "nombre" */}
                <td>{user.nombre || "Sin nombre"}</td>

                <td>{user.email}</td>

                <td>
                  <Badge variant={user.rol === "admin" ? "success" : "default"}>
                    {user.rol}
                  </Badge>
                </td>

                <td>
                  <button className="btn-icon" onClick={() => toggleRole(user)}>
                    🔄
                  </button>

                  <button
                    className="btn-icon"
                    onClick={() => handleDelete(user.id)}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;
