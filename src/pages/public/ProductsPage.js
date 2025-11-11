import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Input from '../../components/atoms/Input';
import ProductGrid from '../../components/organisms/ProductGrid';

const ProductsPage = () => {
  const { products, setCurrentPage, setSelectedProduct } = useApp();
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const filteredProducts = products
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return a.name.localeCompare(b.name);
    });

  return (
    <div className="page">
      <div className="container">
        <h1>Todos los productos</h1>
        
        <div className="filters-bar">
          <Input
            placeholder="Buscar productos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select className="input" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="name">Ordenar por nombre</option>
            <option value="price-asc">Precio: menor a mayor</option>
            <option value="price-desc">Precio: mayor a menor</option>
          </select>
        </div>

        <ProductGrid 
          products={filteredProducts}
          onProductClick={(product) => {
            setSelectedProduct(product);
            setCurrentPage('product-detail');
          }}
        />
      </div>
    </div>
  );
};

export default ProductsPage;