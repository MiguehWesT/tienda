import React from 'react';
import { useApp } from '../../context/AppContext';
import ProductGrid from '../../components/organisms/ProductGrid';
import Button from '../../components/atoms/Button';
import Icon from '../../components/atoms/Icon';

const HomePage = () => {
  const { products, setCurrentPage, setSelectedProduct } = useApp();
  const featuredProducts = products.filter(p => p.featured);

  return (
    <div className="page">
      <section className="hero">
        <div className="container">
          <h1>Bienvenido a MTECH</h1>
          <p>Los mejores productos tecnológicos al mejor precio</p>
          <Button onClick={() => setCurrentPage('products')}>Ver productos</Button>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Productos destacados</h2>
          <ProductGrid 
            products={featuredProducts}
            onProductClick={(product) => {
              setSelectedProduct(product);
              setCurrentPage('product-detail');
            }}
          />
        </div>
      </section>

      <section className="section bg-light">
        <div className="container">
          <h2>Por qué elegirnos</h2>
          <div className="features-grid">
            <div className="feature-card">
              <Icon>🚚</Icon>
              <h3>Envío rápido</h3>
              <p>Entrega en 24-48 horas</p>
            </div>
            <div className="feature-card">
              <Icon>💳</Icon>
              <h3>Pago seguro</h3>
              <p>Múltiples métodos de pago</p>
            </div>
            <div className="feature-card">
              <Icon>🔒</Icon>
              <h3>Garantía</h3>
              <p>Garantía en todos los productos</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;