import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Button from '../../components/atoms/Button';
import FormGroup from '../../components/molecules/FormGroup';
import Input from '../../components/atoms/Input';

const LoginPage = () => {
  const { login, setCurrentPage } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      setCurrentPage('home');
    } catch (err) {
      console.error(err);
      setError(err.message || "Error al iniciar sesión");
    }
  };

  return (
    <div className="page">
      <div className="container">
        <div className="auth-form">
          <h1>Iniciar sesión</h1>
          <form onSubmit={handleSubmit}>

            <FormGroup label="Email" required>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormGroup>

            <FormGroup label="Contraseña" required>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormGroup>

            {error && <p className="error">{error}</p>}

            <Button type="submit">Iniciar sesión</Button>

            <p>
              ¿No tienes cuenta?{' '}
              <a onClick={() => setCurrentPage('register')}>Regístrate</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
