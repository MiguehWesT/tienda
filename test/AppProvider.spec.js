import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { AppProvider } from '../src/context/AppProvider'; 
import { useApp } from '../src/context/AppContext'; 

afterEach(cleanup);

// componente de prueba para poder acceder al context
const TestComponent = () => {
  const { cart, addToCart, removeFromCart, getCartTotal, products } = useApp();
  
  return (
    <div>
      <div data-testid="cart-count">{cart.length}</div>
      <div data-testid="cart-total">{getCartTotal()}</div>
      <button onClick={() => addToCart(products[0])}>
        Agregar Producto
      </button>
      <button onClick={() => removeFromCart(1)}>
        Eliminar Producto
      </button>
    </div>
  );
};

describe('AppProvider (Context)', () => {
  
  it('debería proporcionar el contexto correctamente', () => {
    const { getByTestId } = render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );
    
    expect(getByTestId('cart-count')).toBeTruthy();
  });

  it('debería iniciar con carrito vacío', () => {
    const { getByTestId } = render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );
    
    expect(getByTestId('cart-count').textContent).toBe('0');
  });

  it('debería agregar producto al carrito', () => {
    const { getByTestId, getByText } = render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );
    
    const addButton = getByText('Agregar Producto');
    fireEvent.click(addButton);
    
    expect(getByTestId('cart-count').textContent).toBe('1');
  });

  it('debería calcular el total correctamente', () => {
    const { getByTestId, getByText } = render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );
    
    const addButton = getByText('Agregar Producto');
    fireEvent.click(addButton);
    
    const total = getByTestId('cart-total').textContent;
    expect(parseFloat(total)).toBeGreaterThan(0);
  });

  it('debería eliminar producto del carrito', () => {
    const { getByTestId, getByText } = render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );
    
    // agregar productos
    const addButton = getByText('Agregar Producto');
    fireEvent.click(addButton);
    expect(getByTestId('cart-count').textContent).toBe('1');
    
    // eliminar producto
    const removeButton = getByText('Eliminar Producto');
    fireEvent.click(removeButton);
    expect(getByTestId('cart-count').textContent).toBe('0');
  });

  it('debería sumar cantidades si se agrega el mismo producto', () => {
    const { getByTestId, getByText } = render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );
    
    const addButton = getByText('Agregar Producto');
    fireEvent.click(addButton);
    fireEvent.click(addButton);
    
    // Sigue siendo 1 item pero con cantidad 2
    expect(getByTestId('cart-count').textContent).toBe('1');
  });
});