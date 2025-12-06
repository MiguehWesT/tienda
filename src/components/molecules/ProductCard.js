import React from 'react';
import { useApp } from '../../context/AppContext';
import Button from '../atoms/Button';
import Badge from '../atoms/Badge';

const ProductCard = ({ product, onClick }) => {
  const { addToCart } = useApp();

  // Convertimos price y discount a números seguros
  const price = Number(product.price) || 0;
  const discount = Number(product.discount) || 0;

  // Calculamos precio final de forma segura
  const finalPrice = discount > 0
    ? price * (1 - discount / 100)
    : price;

  return (
    <div className="product-card" onClick={onClick}>
      <div className="product-image">
        <img
          src={product.image}
          alt={product.name}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/500x500?text=Sin+Imagen';
          }}
        />
      </div>

      <div className="product-info">
        <h3>{product.name}</h3>

        <div className="product-price">
          {discount > 0 && (
            <>
              <span className="original-price">${price.toLocaleString()}</span>
              <Badge variant="sale">-{discount}%</Badge>
            </>
          )}

          <span className="current-price">
            ${finalPrice.toLocaleString()}
          </span>
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
