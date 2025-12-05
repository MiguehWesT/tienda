import React from 'react';
import { render, cleanup } from '@testing-library/react';
import FormGroup from '../src/components/molecules/FormGroup'; // ← Cambiado
import Input from '../src/components/atoms/Input'; // ← Cambiado

afterEach(cleanup);

describe('Componente FormGroup (Molecule)', () => {
  
  it('debería renderizar correctamente', () => {
    const { container } = render(
      <FormGroup>
        <Input />
      </FormGroup>
    );
    expect(container.querySelector('.form-group')).toBeTruthy();
  });

  it('debería mostrar el label cuando se proporciona', () => {
    const { getByText } = render(
      <FormGroup label="Nombre">
        <Input />
      </FormGroup>
    );
    expect(getByText('Nombre')).toBeTruthy();
  });

  it('debería mostrar asterisco cuando required=true', () => {
    const { getByText } = render(
      <FormGroup label="Email" required={true}>
        <Input />
      </FormGroup>
    );
    expect(getByText('Email *')).toBeTruthy();
  });

  it('debería renderizar el componente hijo', () => {
    const { container } = render(
      <FormGroup label="Test">
        <Input placeholder="test input" />
      </FormGroup>
    );
    expect(container.querySelector('input')).toBeTruthy();
  });

  it('no debería renderizar label si no se proporciona', () => {
    const { container } = render(
      <FormGroup>
        <Input />
      </FormGroup>
    );
    expect(container.querySelector('.label')).toBeFalsy();
  });
});