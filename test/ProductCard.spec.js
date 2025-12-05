import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import ProductCard from '../src/components/molecules/ProductCard'; 
import { AppProvider } from '../src/context/AppProvider'; 

afterEach(cleanup);

const mockProduct = {
  id: 1,
  name: 'Laptop Pro',
  price: 1099990,
  image: '/images/products/laptop.jpg',
  stock: 10,
  discount: 10
};

const mockProductWithoutDiscount = {
  id: 2,
  name: 'Mouse',
  price: 50000,
  image: '/images/products/mouse.jpg',
  stock: 5
};

describe('Componente ProductCard (Molecule)', () => {
  
  it('debería renderizar el nombre del producto', () => {
    const { getByText } = render(
      <AppProvider>
        <ProductCard product={mockProduct} onClick={() => {}} />
      </AppProvider>
    );
    expect(getByText('Laptop Pro')).toBeTruthy();
  });

  it('debería mostrar el precio formateado', () => {
    const { container } = render(
      <AppProvider>
        <ProductCard product={mockProduct} onClick={() => {}} />
      </AppProvider>
    );
    expect(container.querySelector('.current-price')).toBeTruthy();
  });

  it('debería mostrar el badge de descuento cuando existe', () => {
    const { getByText } = render(
      <AppProvider>
        <ProductCard product={mockProduct} onClick={() => {}} />
      </AppProvider>
    );
    expect(getByText('-10%')).toBeTruthy();
  });

  it('no debería mostrar badge si no hay descuento', () => {
    const { container } = render(
      <AppProvider>
        <ProductCard product={mockProductWithoutDiscount} onClick={() => {}} />
      </AppProvider>
    );
    expect(container.querySelector('.badge-sale')).toBeFalsy();
  });

  it('debería tener un botón "Agregar al carrito"', () => {
    const { getByText } = render(
      <AppProvider>
        <ProductCard product={mockProduct} onClick={() => {}} />
      </AppProvider>
    );
    expect(getByText('Agregar al carrito')).toBeTruthy();
  });

  it('debería llamar onClick al hacer clic en la card', () => {
    const mockOnClick = jasmine.createSpy('onClick');
    const { container } = render(
      <AppProvider>
        <ProductCard product={mockProduct} onClick={mockOnClick} />
      </AppProvider>
    );
    
    const card = container.querySelector('.product-card');
    fireEvent.click(card);
    expect(mockOnClick).toHaveBeenCalled();
  });

  it('debería renderizar la imagen del producto', () => {
    const { container } = render(
      <AppProvider>
        <ProductCard product={mockProduct} onClick={() => {}} />
      </AppProvider>
    );
    const img = container.querySelector('.product-image img');
    expect(img).toBeTruthy();
    expect(img.alt).toBe('Laptop Pro');
  });
});