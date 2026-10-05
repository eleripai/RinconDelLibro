import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Registro.css'; // Comparte la misma hoja de estilos

export default function InicioSesion() {
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
    console.log('Iniciar sesión con:', formData);
    // Lógica de autenticación o llamada a API
  };

  return (
    <div className="split-screen">
      {/* SECCIÓN IZQUIERDA (IMAGEN) */}
      <div className="left-side">
        <div className="brand-overlay">
          <Link className="brand-logo" to="/">
            HomeScape
          </Link>
        </div>
        <img
          src="https://img.magnific.com/foto-gratis/personas-alto-angulo-leyendo-juntas_23-2150062128.jpg?semt=ais_hybrid&w=740&q=80"
          alt="Alojamiento acogedor"
          className="bg-image"
        />
      </div>

      {/* SECCIÓN DERECHA (FORMULARIO) */}
      <div className="right-side">
        <header className="form-header">
          <span className="brand-logo-mobile">HomeScape</span>
          <div className="nav-links">
            <Link to="/login" className="active">
              Iniciar sesión
            </Link>
            <Link to="/registro">
              Regístrate
            </Link>
          </div>
        </header>

        <div className="card-container">
          <div className="form-card">
            <h2>¡Hola de nuevo!</h2>
            <p className="subtitle">
              Ingresa tus datos para acceder a tu cuenta y gestionar tus reservas.
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
                  placeholder="Introduce tu contraseña"
                  required
                />
              </div>

              <button type="submit" className="btn-main">
                Iniciar sesión
              </button>
            </form>

            <div className="divider-container">
              <hr className="line" />
              <span className="divider-text">o ingresa con</span>
              <hr className="line" />
            </div>

            <div className="social-buttons">
              <button type="button" className="btn-social">
                Google
              </button>
              <button type="button" className="btn-social">
                Instagram
              </button>
              <button type="button" className="btn-social">
                Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}