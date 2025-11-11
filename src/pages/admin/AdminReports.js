import React from 'react';
import { useApp } from '../../context/AppContext';

const AdminReports = () => {
  const { orders, products } = useApp();
  
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const avgOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;
  
  const productsSold = orders.reduce((acc, order) => {
    order.items.forEach(item => {
      acc[item.id] = (acc[item.id] || 0) + item.quantity;
    });
    return acc;
  }, {});

  const topProducts = Object.entries(productsSold)
    .map(([id, quantity]) => ({
      product: products.find(p => p.id === Number(id)),
      quantity
    }))
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5);

  return (
    <div className="admin-section">
      <h2>Reportes y Estadísticas</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Ingresos totales</h3>
          <p className="stat-value">${totalRevenue.toFixed(2)}</p>
        </div>
        <div className="stat-card">
          <h3>Órdenes totales</h3>
          <p className="stat-value">{orders.length}</p>
        </div>
        <div className="stat-card">
          <h3>Valor promedio</h3>
          <p className="stat-value">${avgOrderValue.toFixed(2)}</p>
        </div>
        <div className="stat-card">
          <h3>Productos activos</h3>
          <p className="stat-value">{products.length}</p>
        </div>
      </div>

      <div className="report-section">
        <h3>Top 5 Productos más vendidos</h3>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Unidades vendidas</th>
              <th>Ingresos</th>
            </tr>
          </thead>
          <tbody>
            {topProducts.map(({ product, quantity }) => (
              <tr key={product?.id}>
                <td>{product?.image} {product?.name}</td>
                <td>{quantity}</td>
                <td>${((product?.price || 0) * quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="report-section">
        <h3>Historial de compras</h3>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Orden</th>
              <th>Cliente</th>
              <th>Productos</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.slice().reverse().map(order => (
              <tr key={order.id}>
                <td>{new Date(order.date).toLocaleString()}</td>
                <td>#{order.id}</td>
                <td>{order.name || 'Invitado'}</td>
                <td>{order.items.map(i => i.name).join(', ')}</td>
                <td>${order.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminReports;