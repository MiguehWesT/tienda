import React, { useState } from 'react';
import Button from '../../components/atoms/Button';
import FormGroup from '../../components/molecules/FormGroup';
import Input from '../../components/atoms/Input';

const ContactPage = () => {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    subject: '', 
    message: '' 
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <div className="page">
      <div className="container">
        <h1>Contacto</h1>
        <div className="contact-layout">
          <div className="contact-info">
            <h2>Información de contacto</h2>
            <p><strong>Email:</strong> contacto@MTECH.com</p>
            <p><strong>Teléfono:</strong> +56 9 3728 5678</p>
            <p><strong>Dirección:</strong> Av. Ochagavia 123, Santiago, Chile</p>
            <p><strong>Horario:</strong> Lunes a Viernes 9:00 - 18:00</p>
          </div>
          <div className="contact-form">
            <h2>Envíanos un mensaje</h2>
            {submitted ? (
              <div className="success-message">
                ¡Mensaje enviado con éxito! Te responderemos pronto.
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <FormGroup label="Nombre" required>
                  <Input 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </FormGroup>
                <FormGroup label="Email" required>
                  <Input 
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </FormGroup>
                <FormGroup label="Asunto" required>
                  <Input 
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    required
                  />
                </FormGroup>
                <FormGroup label="Mensaje" required>
                  <textarea
                    className="input"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows="5"
                    required
                  />
                </FormGroup>
                <Button type="submit">Enviar mensaje</Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;