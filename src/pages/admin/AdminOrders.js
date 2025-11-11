import React from 'react';
import { useApp } from '../../context/AppContext';

const AdminOrders = () => {
  const { orders, setOrders } = useApp();

  const updateStatus = (orderId, newStatus) => {
    setOrders(orders.map(o => 
      o.id === orderId ? {...o, status: newStatus} : o
    ));
  };

  return (
    <div className="admin-section">
      <h2>Gestión de Órdenes</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Fecha</th>
            <th>Total</th>
            <th>Items</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>#{order.id}</td>
              <td>{order.name || 'N/A'}</td>
              <td>{new Date(order.date).toLocaleDateString()}</td>
              <td>${order.total.toFixed(2)}</td>
              <td>{order.items.length}</td>
              <td>
                <select 
                  className="input-sm" 
                  value={order.status}
                  onChange={(e) => updateStatus(order.id, e.target.value)}
                >
                  <option value="pending">Pendiente</option>
                  <option value="processing">Procesando</option>
                  <option value="completed">Completada</option>
                  <option value="cancelled">Cancelada</option>
                </select>
              </td>
              <td>
                <button className="btn-icon">👁️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;