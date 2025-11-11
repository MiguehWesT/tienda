import React from 'react';
import { useApp } from '../../context/AppContext';
import Button from '../../components/atoms/Button';
import CartItem from '../../components/molecules/CartItem';

const CartPage = () => {
  const { cart, getCartTotal, setCurrentPage } = useApp();

  if (cart.length === 0) {
    return (
      <div className="page">
        <div className="container">
          <h1>Carrito de compras</h1>
          <div className="empty-cart">
            <p>Tu carrito está vacío</p>
            <Button onClick={() => setCurrentPage('products')}>Ver productos</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container">
        <h1>Carrito de compras</h1>
        <div className="cart-layout">
          <div className="cart-items">
            {cart.map(item => <CartItem key={item.id} item={item} />)}
          </div>
          <div className="cart-summary">
            <h3>Resumen del pedido</h3>
            <div className="cart-summary-row">
              <span>Subtotal:</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>
            <div className="cart-summary-row">
              <span>Envío:</span>
              <span>Gratis</span>
            </div>
            <div className="cart-summary-row total">
              <span>Total:</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>
            <Button onClick={() => setCurrentPage('checkout')}>
              Proceder al pago
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;