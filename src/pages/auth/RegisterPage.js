import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Button from '../../components/atoms/Button';
import FormGroup from '../../components/molecules/FormGroup';
import Input from '../../components/atoms/Input';

const RegisterPage = () => {
  const { register, setCurrentPage } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      await register(formData.name, formData.email, formData.password);
      setCurrentPage('home');
    } catch (err) {
      console.error(err);
      setError(err.message || "Error al registrarse");
    }
  };

  return (
    <div className="page">
      <div className="container">
        <div className="auth-form">
          <h1>Registro</h1>

          <form onSubmit={handleSubmit}>

            <FormGroup label="Nombre completo" required>
              <Input
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </FormGroup>

            <FormGroup label="Email" required>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </FormGroup>

            <FormGroup label="Contraseña" required>
              <Input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
            </FormGroup>

            <FormGroup label="Confirmar contraseña" required>
              <Input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                required
              />
            </FormGroup>

            {error && <p className="error">{error}</p>}

            <Button type="submit">Registrarse</Button>

            <p>
              ¿Ya tienes cuenta?{' '}
              <a onClick={() => setCurrentPage('login')}>Inicia sesión</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
