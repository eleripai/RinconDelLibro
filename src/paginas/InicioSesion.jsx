
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase.js';
import '../css/Registro.css';

export default function InicioSesion() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setCargando(true);

    let inicioCorrecto = false;

    try {
      const credencial = await signInWithEmailAndPassword(
        auth,
        formData.email.trim(),
        formData.password
      );

      inicioCorrecto = true;

      const perfilRef = doc(db, 'perfiles', credencial.user.uid);
      const perfilSnap = await getDoc(perfilRef);

      if (!perfilSnap.exists()) {
        await signOut(auth);
        inicioCorrecto = false;
        setError(
          'Tu cuenta no tiene un perfil configurado. Contactá al administrador.'
        );
        return;
      }else{
        console.log(perfilSnap)
      }

      const perfil = perfilSnap.data();

      if (perfil.rol !== 'admin' && perfil.rol !== 'usuario') {
        await signOut(auth);
        inicioCorrecto = false;
        setError('El perfil de tu cuenta no tiene un rol válido.');
        return;
      }

      setFormData({ email: '', password: '' });

      // Por ahora, ambos roles vuelven a la página principal.
      // Más adelante conectaremos el panel de administración.
      navigate('/');
    } catch (err) {
      console.error('Error al iniciar sesión:', err);

      if (
        err.code === 'auth/invalid-credential' ||
        err.code === 'auth/user-not-found' ||
        err.code === 'auth/wrong-password' ||
        err.code === 'auth/invalid-email'
      ) {
        setError('El correo electrónico o la contraseña son incorrectos.');
      } else {
        setError('No se pudo iniciar sesión. Revisá tu conexión e intentá nuevamente.');
      }
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="split-screen">
      <div className="left-side">
        <div className="brand-overlay">
          <Link className="brand-logo" to="/">
            RinconDelLibro
          </Link>
        </div>

        <img
          src="https://img.magnific.com/foto-gratis/personas-alto-angulo-leyendo-juntas_23-2150062128.jpg?semt=ais_hybrid&w=740&q=80"
          alt="Personas leyendo juntas"
          className="bg-image"
        />
      </div>

      <div className="right-side">
        <header className="form-header">
          <span className="brand-logo-mobile">Rincon Del Libro</span>

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
                  autoComplete="email"
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
                  autoComplete="current-password"
                  required
                />
              </div>

              {error && <p role="alert">{error}</p>}

              <button
                type="submit"
                className="btn-main"
                disabled={cargando}
              >
                {cargando ? 'Iniciando sesión...' : 'Iniciar sesión'}
              </button>
            </form>

            <div className="divider-container">
              <hr className="line" />
              <span className="divider-text">o ingresa con</span>
              <hr className="line" />
            </div>

            <div className="social-buttons">
              <button type="button" className="btn-social" disabled>
                Google
              </button>
              <button type="button" className="btn-social" disabled>
                Instagram
              </button>
              <button type="button" className="btn-social" disabled>
                Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
