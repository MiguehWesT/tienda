import React from 'react';
import { render, cleanup } from '@testing-library/react';
import CartPage from '../src/pages/public/CartPage';
import { AppProvider } from '../src/context/AppProvider';

afterEach(cleanup);

describe('Página CartPage', () => {
  
  it('debería renderizar el título', () => {
    const { getByText } = render(
      <AppProvider>
        <CartPage />
      </AppProvider>
    );
    expect(getByText('Carrito de compras')).toBeTruthy();
  });

  it('debería mostrar mensaje de carrito vacío inicialmente', () => {
    const { getByText } = render(
      <AppProvider>
        <CartPage />
      </AppProvider>
    );
    expect(getByText('Tu carrito está vacío')).toBeTruthy();
  });

  it('debería tener botón "Ver productos" cuando está vacío', () => {
    const { getByText } = render(
      <AppProvider>
        <CartPage />
      </AppProvider>
    );
    expect(getByText('Ver productos')).toBeTruthy();
  });

  it('debería renderizar el componente empty-cart cuando no hay items', () => {
    const { container } = render(
      <AppProvider>
        <CartPage />
      </AppProvider>
    );
    expect(container.querySelector('.empty-cart')).toBeTruthy();
  });
});