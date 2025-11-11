import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Button from '../../components/atoms/Button';
import Badge from '../../components/atoms/Badge';

const ProductDetailPage = () => {
  const { selectedProduct, addToCart, setCurrentPage } = useApp();
  const [quantity, setQuantity] = useState(1);

  if (!selectedProduct) {
    return (
      <div className="page">
        <div className="container">Producto no encontrado</div>
      </div>
    );
  }

  const finalPrice = selectedProduct.discount 
    ? selectedProduct.price * (1 - selectedProduct.discount / 100) 
    : selectedProduct.price;

  return (
    <div className="page">
      <div className="container">
        <Button variant="secondary" onClick={() => setCurrentPage('products')}>
          ← Volver
        </Button>
        
        <div className="product-detail">
          <div className="product-detail-image">
            <img 
              src={selectedProduct.image} 
              alt={selectedProduct.name}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/800x800?text=Sin+Imagen';
              }}
            />
          </div>
          <div className="product-detail-info">
            <h1>{selectedProduct.name}</h1>
            <div className="product-detail-price">
              {selectedProduct.discount && (
                <>
                  <span className="original-price">${selectedProduct.price}</span>
                  <Badge variant="sale">-{selectedProduct.discount}%</Badge>
                </>
              )}
              <span className="current-price">${finalPrice.toFixed(2)}</span>
            </div>
            <p>Stock disponible: {selectedProduct.stock} unidades</p>
            <p>Categoría: {selectedProduct.category}</p>
            
            <div className="product-actions">
              <div className="quantity-selector">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(Math.min(selectedProduct.stock, quantity + 1))}>+</button>
              </div>
              <Button onClick={() => {
                addToCart(selectedProduct, quantity);
                alert('Producto agregado al carrito');
              }}>
                Agregar al carrito
              </Button>
            </div>

            <div className="product-description">
              <h3>Descripción</h3>
              <p>Este es un producto de alta calidad que cumple con todos los estándares de la industria. Perfecto para tus necesidades tecnológicas.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;