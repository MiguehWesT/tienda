import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Button from '../../components/atoms/Button';
import FormGroup from '../../components/molecules/FormGroup';
import Input from '../../components/atoms/Input';

const AdminCategories = () => {
  const { categories, setCategories, products } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', label: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const count = products.filter(p => p.category === formData.name).length;
    setCategories([...categories, { 
      id: categories.length + 1, 
      ...formData, 
      count 
    }]);
    setFormData({ name: '', label: '' });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta categoría?')) {
      setCategories(categories.filter(c => c.id !== id));
    }
  };

  return (
    <div className="admin-section">
      <div className="admin-header">
        <h2>Gestión de Categorías</h2>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancelar' : '+ Nueva Categoría'}
        </Button>
      </div>

      {showForm && (
        <form className="admin-form" onSubmit={handleSubmit}>
          <FormGroup label="Nombre técnico">
            <Input 
              value={formData.name} 
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
              required 
            />
          </FormGroup>
          <FormGroup label="Etiqueta visible">
            <Input 
              value={formData.label} 
              onChange={(e) => setFormData({...formData, label: e.target.value})} 
              required 
            />
          </FormGroup>
          <Button type="submit">Crear Categoría</Button>
        </form>
      )}

      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Etiqueta</th>
            <th>Productos</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(cat => (
            <tr key={cat.id}>
              <td>{cat.id}</td>
              <td>{cat.name}</td>
              <td>{cat.label}</td>
              <td>{cat.count}</td>
              <td>
                <button className="btn-icon" onClick={() => handleDelete(cat.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCategories;