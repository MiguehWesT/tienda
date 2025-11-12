import React from 'react';
import ReactDOM from 'react-dom/client';
// Importar estilos
import './styles/global.css';
import './styles/atoms.css';
import './styles/molecules.css';
import './styles/organisms.css';
import './styles/pages.css';
import './styles/admin.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();