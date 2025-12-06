import React from 'react';
import { useApp } from '../../context/AppContext';

const AdminReports = () => {
  const { orders, products } = useApp();

  const totalRevenue = orders.reduce(
    (sum, o) => sum + Number(o.total || 0),
    0
  );

  const avgOrderValue = orders.length ? totalRevenue / orders.length : 0;

  // conteo de productos vendidos
  const productsSold = {};

  orders.forEach(order => {
    order.detalle?.forEach(item => {
      productsSold[item.producto_id] =
        (productsSold[item.producto_id] || 0) + item.cantidad;
    });
  });

  const topProducts = Object.entries(productsSold)
    .map(([id, qty]) => ({
      product: products.find(p => p.id === Number(id)),
      qty
    }))
    .filter(p => p.product)
    .sort((a, b) => b.qty - a.qty)
    .slice(0, 5);

  return (
    <div className="admin-section">
      <h2>Reportes</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Ingresos Totales</h3>
          <p>${totalRevenue.toFixed(2)}</p>
        </div>

        <div className="stat-card">
          <h3>Órdenes</h3>
          <p>{orders.length}</p>
        </div>

        <div className="stat-card">
          <h3>Promedio por Orden</h3>
          <p>${avgOrderValue.toFixed(2)}</p>
        </div>
      </div>

      <h3>Top Productos Vendidos</h3>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Ingresos</th>
          </tr>
        </thead>
        <tbody>
          {topProducts.map(p => (
            <tr key={p.product.id}>
              <td>{p.product.name}</td>
              <td>{p.qty}</td>
              <td>${(p.product.price * p.qty).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminReports;
