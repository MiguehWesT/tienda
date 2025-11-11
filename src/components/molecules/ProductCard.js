import React from 'react';
import { useApp } from '../../context/AppContext';
import Button from '../atoms/Button';
import Badge from '../atoms/Badge';

const ProductCard = ({ product, onClick }) => {
  const { addToCart } = useApp();
  const finalPrice = product.discount 
    ? product.price * (1 - product.discount / 100) 
    : product.price;

  return (
    <div className="product-card" onClick={onClick}>
      <div className="product-image">
        <img 
          src={product.image} 
          alt={product.name}
          onError={(e) => {
            // placeholder en caso de que no cargue la imagen
            e.target.src = 'https://via.placeholder.com/500x500?text=Sin+Imagen';
          }}
        />
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <div className="product-price">
          {product.discount && (
            <>
              <span className="original-price">${product.price}</span>
              <Badge variant="sale">-{product.discount}%</Badge>
            </>
          )}
          <span className="current-price">${finalPrice.toFixed(2)}</span>
        </div>
        <Button 
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product);
          }}
        >
          Agregar al carrito
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;