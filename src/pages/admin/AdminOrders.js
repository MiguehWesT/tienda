import React from 'react';
import { useApp } from '../../context/AppContext';

const AdminOrders = () => {
  const { orders } = useApp();

  return (
    <div className="admin-section">
      <h2>Gestión de Órdenes</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Fecha</th>
            <th>Total</th>
            <th>Items</th>
            <th>Estado</th>
          </tr>
        </thead>

        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>#{order.id}</td>
              <td>{order.nombre_cliente}</td>
              <td>{new Date(order.created_at).toLocaleString()}</td>
              <td>${Number(order.total).toFixed(2)}</td>
              <td>{order.detalle?.length || 0}</td>
              <td>{order.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;
