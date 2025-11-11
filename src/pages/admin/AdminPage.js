import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Button from '../../components/atoms/Button';
import AdminDashboard from './AdminDashboard';
import AdminProducts from './AdminProducts';
import AdminUsers from './AdminUsers';
import AdminCategories from './AdminCategories';
import AdminOrders from './AdminOrders';
import AdminReports from './AdminReports';

const AdminPage = () => {
  const { user, setCurrentPage } = useApp();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (!user || user.role !== 'admin') {
    return (
      <div className="page">
        <div className="container">
          <h1>Acceso denegado</h1>
          <p>No tienes permisos para acceder a esta página.</p>
          <Button onClick={() => setCurrentPage('home')}>Volver al inicio</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container">
        <div className="admin-header">
          <h1>Panel de Administración</h1>
          <Button variant="secondary" onClick={() => setCurrentPage('home')}>
            Volver a la tienda
          </Button>
        </div>

        <div className="admin-layout">
          <aside className="admin-sidebar">
            <nav className="admin-nav">
              <button 
                className={activeTab === 'dashboard' ? 'active' : ''}
                onClick={() => setActiveTab('dashboard')}
              >
                📊 Dashboard
              </button>
              <button 
                className={activeTab === 'products' ? 'active' : ''}
                onClick={() => setActiveTab('products')}
              >
                📦 Productos
              </button>
              <button 
                className={activeTab === 'users' ? 'active' : ''}
                onClick={() => setActiveTab('users')}
              >
                👥 Usuarios
              </button>
              <button 
                className={activeTab === 'categories' ? 'active' : ''}
                onClick={() => setActiveTab('categories')}
              >
                🏷️ Categorías
              </button>
              <button 
                className={activeTab === 'orders' ? 'active' : ''}
                onClick={() => setActiveTab('orders')}
              >
                🛍️ Órdenes
              </button>
              <button 
                className={activeTab === 'reports' ? 'active' : ''}
                onClick={() => setActiveTab('reports')}
              >
                📈 Reportes
              </button>
            </nav>
          </aside>

          <main className="admin-content">
            {activeTab === 'dashboard' && <AdminDashboard />}
            {activeTab === 'products' && <AdminProducts />}
            {activeTab === 'users' && <AdminUsers />}
            {activeTab === 'categories' && <AdminCategories />}
            {activeTab === 'orders' && <AdminOrders />}
            {activeTab === 'reports' && <AdminReports />}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;