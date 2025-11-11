import React from 'react';
import { useApp } from '../../context/AppContext';
import NavLink from '../molecules/NavLink';
import Button from '../atoms/Button';

const Header = () => {
  const { setCurrentPage, user, setUser, cart } = useApp();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="header-logo" onClick={() => setCurrentPage('home')}>
            <img 
              src="/images/logo.png" 
              alt="MTECH Logo"
              onError={(e) => {
                // Fallback al texto si no hay logo
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'inline';
              }}
            />
            <h1 style={{ display: 'none' }}>🛒 MTECH</h1>
          </div>
          
          <nav className="main-nav">
            <NavLink page="home">Inicio</NavLink>
            <NavLink page="products">Productos</NavLink>
            <NavLink page="categories">Categorías</NavLink>
            <NavLink page="offers">Ofertas</NavLink>
            <NavLink page="blog">Blog</NavLink>
            <NavLink page="about">Nosotros</NavLink>
            <NavLink page="contact">Contacto</NavLink>
          </nav>
          
          <div className="header-actions">
            <Button variant="secondary" onClick={() => setCurrentPage('cart')}>
              🛒 Carrito ({cartCount})
            </Button>
            {user ? (
              <>
                <span>Hola, {user.name}</span>
                {user.role === 'admin' && (
                  <Button onClick={() => setCurrentPage('admin')}>Admin</Button>
                )}
                <Button variant="secondary" onClick={() => setUser(null)}>Salir</Button>
              </>
            ) : (
              <>
                <Button onClick={() => setCurrentPage('login')}>Iniciar sesión</Button>
                <Button variant="secondary" onClick={() => setCurrentPage('register')}>Registro</Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;