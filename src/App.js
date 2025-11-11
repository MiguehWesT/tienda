import React from 'react';
import { AppProvider } from './context/AppProvider';
import Header from './components/organisms/Header';
import AppRouter from './router/AppRouter';

const App = () => {
  return React.createElement(
    AppProvider,
    null,
    React.createElement(
      'div',
      { className: 'app' },
      React.createElement(Header, null),
      React.createElement(
        'main',
        { className: 'main-content' },
        React.createElement(AppRouter, null)
      ),
      React.createElement(
        'footer',
        { className: 'footer' },
        React.createElement(
          'div',
          { className: 'container' },
          React.createElement(
            'p',
            null,
            '© 2025 MTECH. Todos los derechos reservados.'
          )
        )
      )
    )
  );
};

export default App;