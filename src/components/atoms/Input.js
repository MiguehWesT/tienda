import React from 'react';

const Input = ({ type = 'text', placeholder, value, onChange, required }) => {
  return (
    <input
      className="input"
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
    />
  );
};

export default Input;