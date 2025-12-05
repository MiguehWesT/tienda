import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import Input from '../src/components/atoms/Input'; // ← Cambiado

afterEach(cleanup);

describe('Componente Input (Atom)', () => {
  
  it('debería renderizar un input correctamente', () => {
    const { container } = render(<Input />);
    const input = container.querySelector('input');
    expect(input).toBeTruthy();
  });

  it('debería tener la clase input', () => {
    const { container } = render(<Input />);
    const input = container.querySelector('input');
    expect(input.className).toContain('input');
  });

  it('debería tener type="text" por defecto', () => {
    const { container } = render(<Input />);
    const input = container.querySelector('input');
    expect(input.type).toBe('text');
  });

  it('debería cambiar el type cuando se especifica', () => {
    const { container } = render(<Input type="email" />);
    const input = container.querySelector('input');
    expect(input.type).toBe('email');
  });

  it('debería mostrar el placeholder correctamente', () => {
    const { getByPlaceholderText } = render(
      <Input placeholder="Ingrese su nombre" />
    );
    expect(getByPlaceholderText('Ingrese su nombre')).toBeTruthy();
  });

  it('debería tener el valor especificado', () => {
    const { container } = render(<Input value="Test Value" onChange={() => {}} />);
    const input = container.querySelector('input');
    expect(input.value).toBe('Test Value');
  });

  it('debería llamar onChange al escribir', () => {
    const mockOnChange = jasmine.createSpy('onChange');
    const { container } = render(<Input onChange={mockOnChange} />);
    const input = container.querySelector('input');
    
    fireEvent.change(input, { target: { value: 'nuevo texto' } });
    expect(mockOnChange).toHaveBeenCalled();
  });

  it('debería tener el atributo required cuando se especifica', () => {
    const { container } = render(<Input required={true} />);
    const input = container.querySelector('input');
    expect(input.required).toBe(true);
  });
});