import React from 'react';
import { useApp } from '../../context/AppContext';
import Button from '../../components/atoms/Button';

const SuccessPage = () => {
  const { setCurrentPage, orders } = useApp();
  const lastOrder = orders[orders.length - 1];

  return (
    <div className="page">
      <div className="container">
        <div className="success-page">
          <div className="success-icon">✅</div>
          <h1>¡Compra exitosa!</h1>
          <p>Tu pedido #{lastOrder?.id} ha sido procesado correctamente.</p>
          <p>Recibirás un email de confirmación en breve.</p>
          <div className="success-actions">
            <Button onClick={() => setCurrentPage('home')}>Volver al inicio</Button>
            <Button variant="secondary" onClick={() => setCurrentPage('products')}>
              Seguir comprando
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;