import React from 'react';
import { useApp } from '../../context/AppContext';
import Badge from '../../components/atoms/Badge';

const AdminDashboard = () => {
  const { orders, products, users } = useApp();
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

  return (
    <div className="admin-section">
      <h2>Dashboard</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total de ventas</h3>
          <p className="stat-value">${totalRevenue.toFixed(2)}</p>
        </div>
        <div className="stat-card">
          <h3>Órdenes</h3>
          <p className="stat-value">{orders.length}</p>
        </div>
        <div className="stat-card">
          <h3>Productos</h3>
          <p className="stat-value">{products.length}</p>
        </div>
        <div className="stat-card">
          <h3>Usuarios</h3>
          <p className="stat-value">{users.length}</p>
        </div>
      </div>

      <div className="recent-orders">
        <h3>Órdenes recientes</h3>
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Fecha</th>
              <th>Total</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {orders.slice(-5).reverse().map(order => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>{new Date(order.date).toLocaleDateString()}</td>
                <td>${order.total.toFixed(2)}</td>
                <td><Badge variant="success">{order.status}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;