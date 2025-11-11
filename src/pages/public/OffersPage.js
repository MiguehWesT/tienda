import React from 'react';
import { useApp } from '../../context/AppContext';
import ProductGrid from '../../components/organisms/ProductGrid';

const OffersPage = () => {
  const { products, setCurrentPage, setSelectedProduct } = useApp();
  const offerProducts = products.filter(p => p.discount);

  return (
    <div className="page">
      <div className="container">
        <h1>🔥 Ofertas especiales</h1>
        <p className="subtitle">¡No te pierdas estas increíbles ofertas por tiempo limitado!</p>
        {offerProducts.length > 0 ? (
          <ProductGrid 
            products={offerProducts}
            onProductClick={(product) => {
              setSelectedProduct(product);
              setCurrentPage('product-detail');
            }}
          />
        ) : (
          <p>No hay ofertas disponibles en este momento.</p>
        )}
      </div>
    </div>
  );
};

export default OffersPage;