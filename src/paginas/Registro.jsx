
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase.js';
import '../css/Registro.css';

export default function Registro() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);

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
    setMensaje('');

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    setCargando(true);

    try {
      const credencial = await createUserWithEmailAndPassword(
        auth,
        formData.email.trim(),
        formData.password
      );

      await setDoc(doc(db, 'perfiles', credencial.user.uid), {
        email: credencial.user.email,
        rol: 'usuario',
        fechaRegistro: serverTimestamp()
      });

      setMensaje('¡Cuenta creada correctamente! Ya podés iniciar sesión.');
      setFormData({ email: '', password: '' });
    } catch (err) {
      console.error('Error al registrar usuario:', err);

      if (err.code === 'auth/email-already-in-use') {
        setError('Ese correo electrónico ya está registrado.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Ingresá una dirección de correo válida.');
      } else if (err.code === 'auth/weak-password') {
        setError('La contraseña es demasiado débil.');
      } else if (err.code === 'permission-denied') {
        setError(
          'La cuenta se creó, pero no se pudo guardar su perfil. Revisá las reglas de Firestore.'
        );
      } else {
        setError('No se pudo completar el registro. Revisá tu conexión e intentá nuevamente.');
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
            RinconcDel Libro
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
            <Link to="/login">Iniciar sesión</Link>
            <Link to="/registro" className="active">
              Regístrate
            </Link>
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
                  placeholder="Crea una contraseña"
                  autoComplete="new-password"
                  minLength={6}
                  required
                />
              </div>

              {error && <p role="alert">{error}</p>}
              {mensaje && <p role="status">{mensaje}</p>}

              <button
                type="submit"
                className="btn-main"
                disabled={cargando}
              >
                {cargando ? 'Creando cuenta...' : 'Continuar con e-mail'}
              </button>
            </form>

            <div className="divider-container">
              <hr className="line" />
              <span className="divider-text">o elige otra opción</span>
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
