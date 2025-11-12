import React from "react";
// Usamos render y cleanup de @testing-library/react
import { render, cleanup } from "@testing-library/react"; 
import App from "../src/App"; // Asegúrate que la ruta a tu App.js sea correcta

// Limpia el DOM después de cada prueba
afterEach(cleanup);

describe("Componente App", () => {
  it('debería mostrar el texto del footer', () => {
    
    // Renderizar el componente <App />
    const { getByText } = render(<App />);
    
    // Buscar un texto que exista en app.js
    expect(getByText(/MTECH. Todos los derechos reservados./i)).toBeTruthy();

    
  });
});