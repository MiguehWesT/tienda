import React from 'react';
import Label from '../atoms/Label';

const FormGroup = ({ label, children, required }) => {
  return (
    <div className="form-group">
      {label && <Label>{label}{required && ' *'}</Label>}
      {children}
    </div>
  );
};

export default FormGroup;