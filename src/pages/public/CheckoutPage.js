import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Button from '../../components/atoms/Button';
import FormGroup from '../../components/molecules/FormGroup';
import Input from '../../components/atoms/Input';

const CheckoutPage = () => {
  const { user, getCartTotal, placeOrder, setCurrentPage, checkoutStep, setCheckoutStep } = useApp();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    address: '',
    city: '',
    postalCode: '',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCVV: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkoutStep === 1) {
      setCheckoutStep(2);
    } else if (checkoutStep === 2) {
      setCheckoutStep(3);
    } else {
      placeOrder(formData);
      setCurrentPage('success');
      setCheckoutStep(1);
    }
  };

  return (
    <div className="page">
      <div className="container">
        <h1>Checkout</h1>
        <div className="checkout-steps">
          <div className={`step ${checkoutStep >= 1 ? 'active' : ''}`}>1. Datos de envío</div>
          <div className={`step ${checkoutStep >= 2 ? 'active' : ''}`}>2. Método de pago</div>
          <div className={`step ${checkoutStep >= 3 ? 'active' : ''}`}>3. Confirmación</div>
        </div>

        <form className="checkout-form" onSubmit={handleSubmit}>
          {checkoutStep === 1 && (
            <>
              <h2>Información de envío</h2>
              <FormGroup label="Nombre completo" required>
                <Input 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </FormGroup>
              <FormGroup label="Email" required>
                <Input 
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </FormGroup>
              <FormGroup label="Dirección" required>
                <Input 
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  required
                />
              </FormGroup>
              <div className="form-row">
                <FormGroup label="Ciudad" required>
                  <Input 
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    required
                  />
                </FormGroup>
                <FormGroup label="Código Postal" required>
                  <Input 
                    value={formData.postalCode}
                    onChange={(e) => setFormData({...formData, postalCode: e.target.value})}
                    required
                  />
                </FormGroup>
              </div>
            </>
          )}

          {checkoutStep === 2 && (
            <>
              <h2>Método de pago</h2>
              <FormGroup label="Número de tarjeta" required>
                <Input 
                  value={formData.cardNumber}
                  onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
                  placeholder="1234 5678 9012 3456"
                  required
                />
              </FormGroup>
              <FormGroup label="Nombre en la tarjeta" required>
                <Input 
                  value={formData.cardName}
                  onChange={(e) => setFormData({...formData, cardName: e.target.value})}
                  required
                />
              </FormGroup>
              <div className="form-row">
                <FormGroup label="Fecha de expiración" required>
                  <Input 
                    value={formData.cardExpiry}
                    onChange={(e) => setFormData({...formData, cardExpiry: e.target.value})}
                    placeholder="MM/AA"
                    required
                  />
                </FormGroup>
                <FormGroup label="CVV" required>
                  <Input 
                    value={formData.cardCVV}
                    onChange={(e) => setFormData({...formData, cardCVV: e.target.value})}
                    placeholder="123"
                    required
                  />
                </FormGroup>
              </div>
            </>
          )}

          {checkoutStep === 3 && (
            <>
              <h2>Confirmación del pedido</h2>
              <div className="confirmation-details">
                <h3>Datos de envío</h3>
                <p>{formData.name}</p>
                <p>{formData.email}</p>
                <p>{formData.address}</p>
                <p>{formData.city}, {formData.postalCode}</p>
                
                <h3>Total a pagar</h3>
                <p className="total-amount">${getCartTotal().toFixed(2)}</p>
              </div>
            </>
          )}

          <div className="checkout-actions">
            {checkoutStep > 1 && (
              <Button type="button" variant="secondary" onClick={() => setCheckoutStep(checkoutStep - 1)}>
                Atrás
              </Button>
            )}
            <Button type="submit">
              {checkoutStep === 3 ? 'Confirmar pedido' : 'Continuar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;