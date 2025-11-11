import React from 'react';
import { useApp } from '../../context/AppContext';

const NavLink = ({ page, children, active }) => {
  const { setCurrentPage } = useApp();
  
  return (
    <a 
      className={`nav-link ${active ? 'active' : ''}`}
      onClick={() => setCurrentPage(page)}
    >
      {children}
    </a>
  );
};

export default NavLink;