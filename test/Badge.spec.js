import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Badge from '../src/components/atoms/Badge';
afterEach(cleanup);

describe('Componente Badge (Atom)', () => {
  
  it('debería renderizar correctamente con texto', () => {
    const { getByText } = render(<Badge>New</Badge>);
    expect(getByText('New')).toBeTruthy();
  });

  it('debería tener la clase badge-default por defecto', () => {
    const { container } = render(<Badge>Test</Badge>);
    const badge = container.querySelector('span');
    expect(badge.className).toContain('badge-default');
  });

  it('debería aplicar la variante sale correctamente', () => {
    const { container } = render(<Badge variant="sale">-50%</Badge>);
    const badge = container.querySelector('span');
    expect(badge.className).toContain('badge-sale');
  });

  it('debería aplicar la variante success correctamente', () => {
    const { container } = render(<Badge variant="success">Success</Badge>);
    const badge = container.querySelector('span');
    expect(badge.className).toContain('badge-success');
  });

  it('debería renderizar contenido numérico', () => {
    const { getByText } = render(<Badge>10</Badge>);
    expect(getByText('10')).toBeTruthy();
  });
});