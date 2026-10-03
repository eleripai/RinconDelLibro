import React, { useState } from 'react';
import '../css/Registro.css';
import '../js/Registro.js';

export default function Registro() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos enviados:', formData);
    // Aquí puedes agregar la lógica de autenticación o la llamada a la API
  };

  return (
    <div className="split-screen">
      <div className="left-side">
        <div className="brand-overlay">
          <a className="brand-logo" href="/">
            HomeScape
          </a>
        </div>
        <img
          src="galeria/images.jfif"
          alt="Alojamiento acogedor"
          className="bg-image"
        />
      </div>

      <div className="right-side">
        <header className="form-header">
          <span className="brand-logo-mobile">HomeScape</span>
          <div className="nav-links">
            <a href="/login">Iniciar sesión</a>
            <a href="/register" className="active">
              Regístrate
            </a>
          </div>
        </header>

        <div className="card-container">
          <div className="form-card">
            <h2>Crear una cuenta</h2>
            <p className="subtitle">
              Registrate para gestionar tus reservas de forma más fácil.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="email">Dirección de e-mail</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Introduce tu e-mail"
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="password">Contraseña</label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Crea una contraseña"
                  required
                />
              </div>

              <button type="submit" className="btn-main">
                Continuar con e-mail
              </button>
            </form>

            <div className="divider-container">
              <hr className="line" />
              <span className="divider-text">o elige otra opción</span>
              <hr className="line" />
            </div>

            <div className="social-buttons">
              <button type="button" className="btn-social">
                Google
              </button>
             <button type="button" className="btn-social">
                Instagram
              </button><button type="button" className="btn-social">
                Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}