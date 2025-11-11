import React from 'react';
import { useApp } from '../../context/AppContext';
import Button from '../../components/atoms/Button';

const ErrorPage = () => {
  const { setCurrentPage } = useApp();

  return (
    <div className="page">
      <div className="container">
        <div className="error-page">
          <div className="error-icon">❌</div>
          <h1>Error en el pago</h1>
          <p>Lo sentimos, hubo un problema al procesar tu pago.</p>
          <p>Por favor, verifica tus datos e inténtalo nuevamente.</p>
          <div className="error-actions">
            <Button onClick={() => setCurrentPage('checkout')}>Reintentar</Button>
            <Button variant="secondary" onClick={() => setCurrentPage('cart')}>
              Volver al carrito
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;