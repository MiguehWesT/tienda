import React from 'react';
import { useApp } from '../../context/AppContext';
import Button from '../atoms/Button';

const CartItem = ({ item }) => {
  const { updateCartQuantity, removeFromCart } = useApp();
  const price = item.discount ? item.price * (1 - item.discount / 100) : item.price;

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img 
          src={item.image} 
          alt={item.name}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/100x100?text=Sin+Imagen';
          }}
        />
      </div>
      <div className="cart-item-info">
        <h4>{item.name}</h4>
        <p>${price.toFixed(2)}</p>
      </div>
      <div className="cart-item-quantity">
        <button onClick={() => updateCartQuantity(item.id, item.quantity - 1)}>-</button>
        <span>{item.quantity}</span>
        <button onClick={() => updateCartQuantity(item.id, item.quantity + 1)}>+</button>
      </div>
      <div className="cart-item-total">
        ${(price * item.quantity).toFixed(2)}
      </div>
      <Button variant="danger" onClick={() => removeFromCart(item.id)}>×</Button>
    </div>
  );
};

export default CartItem;