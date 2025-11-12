import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import Button from '../src/components/atoms/Button';

afterEach(cleanup);

describe('Componente Button (Atom)', () => {
  
  it('debería renderizar correctamente con texto', () => {
    const { getByText } = render(<Button>Click me</Button>);
    expect(getByText('Click me')).toBeTruthy();
  });

  it('debería tener la clase btn-primary por defecto', () => {
    const { container } = render(<Button>Test</Button>);
    const button = container.querySelector('button');
    expect(button.className).toContain('btn-primary');
  });

  it('debería aplicar la variante secondary correctamente', () => {
    const { container } = render(<Button variant="secondary">Test</Button>);
    const button = container.querySelector('button');
    expect(button.className).toContain('btn-secondary');
  });

  it('debería aplicar la variante danger correctamente', () => {
    const { container } = render(<Button variant="danger">Delete</Button>);
    const button = container.querySelector('button');
    expect(button.className).toContain('btn-danger');
  });

  it('debería llamar onClick cuando se hace clic', () => {
    const mockOnClick = jasmine.createSpy('onClick');
    const { getByText } = render(
      <Button onClick={mockOnClick}>Click me</Button>
    );
    
    fireEvent.click(getByText('Click me'));
    expect(mockOnClick).toHaveBeenCalled();
  });

  it('debería estar deshabilitado cuando disabled=true', () => {
    const mockOnClick = jasmine.createSpy('onClick');
    const { container } = render(
      <Button onClick={mockOnClick} disabled={true}>Disabled</Button>
    );
    
    const button = container.querySelector('button');
    expect(button.disabled).toBe(true);
    
    fireEvent.click(button);
    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it('debería tener type="submit" cuando se especifica', () => {
    const { container } = render(<Button type="submit">Submit</Button>);
    const button = container.querySelector('button');
    expect(button.type).toBe('submit');
  });

  it('debería tener type="button" por defecto', () => {
    const { container } = render(<Button>Default</Button>);
    const button = container.querySelector('button');
    expect(button.type).toBe('button');
  });
});