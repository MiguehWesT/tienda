import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Button from '../../components/atoms/Button';
import FormGroup from '../../components/molecules/FormGroup';
import Input from '../../components/atoms/Input';

const AdminProducts = () => {
  const { products, setProducts } = useApp();
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '', 
    price: '', 
    category: 'electronics', 
    stock: '', 
    image: '📦', 
    discount: 0
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      setProducts(products.map(p => 
        p.id === editing.id 
          ? { ...editing, ...formData, price: Number(formData.price), stock: Number(formData.stock), discount: Number(formData.discount) } 
          : p
      ));
      setEditing(null);
    } else {
      setProducts([...products, { 
        id: products.length + 1, 
        ...formData, 
        price: Number(formData.price), 
        stock: Number(formData.stock),
        discount: Number(formData.discount)
      }]);
    }
    setFormData({ name: '', price: '', category: 'electronics', stock: '', image: '📦', discount: 0 });
    setShowForm(false);
  };

  const handleEdit = (product) => {
    setEditing(product);
    setFormData(product);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  return (
    <div className="admin-section">
      <div className="admin-header">
        <h2>Gestión de Productos</h2>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancelar' : '+ Nuevo Producto'}
        </Button>
      </div>

      {showForm && (
        <form className="admin-form" onSubmit={handleSubmit}>
          <FormGroup label="Nombre">
            <Input 
              value={formData.name} 
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
              required 
            />
          </FormGroup>
          <FormGroup label="Precio">
            <Input 
              type="number" 
              value={formData.price} 
              onChange={(e) => setFormData({...formData, price: e.target.value})} 
              required 
            />
          </FormGroup>
          <FormGroup label="Categoría">
            <select 
              className="input" 
              value={formData.category} 
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
              <option value="electronics">Electrónica</option>
              <option value="accessories">Accesorios</option>
            </select>
          </FormGroup>
          <FormGroup label="Stock">
            <Input 
              type="number" 
              value={formData.stock} 
              onChange={(e) => setFormData({...formData, stock: e.target.value})} 
              required 
            />
          </FormGroup>
          <FormGroup label="Descuento (%)">
            <Input 
              type="number" 
              value={formData.discount} 
              onChange={(e) => setFormData({...formData, discount: e.target.value})} 
            />
          </FormGroup>
          <FormGroup label="Emoji">
            <Input 
              value={formData.image} 
              onChange={(e) => setFormData({...formData, image: e.target.value})} 
            />
          </FormGroup>
          <Button type="submit">{editing ? 'Actualizar' : 'Crear'} Producto</Button>
        </form>
      )}

      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Categoría</th>
            <th>Descuento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.image}</td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.stock}</td>
              <td>{product.category}</td>
              <td>{product.discount}%</td>
              <td>
                <button className="btn-icon" onClick={() => handleEdit(product)}>✏️</button>
                <button className="btn-icon" onClick={() => handleDelete(product.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProducts;