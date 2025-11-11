import React from 'react';

const Button = ({ children, onClick, variant = 'primary', disabled, type = 'button' }) => {
  return (
    <button 
      className={`btn btn-${variant}`} 
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;