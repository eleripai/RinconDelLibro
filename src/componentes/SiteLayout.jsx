import { useAuth } from '../contextos/AuthContext.jsx';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase.js';
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import '../css/site-layout.css';

const navItems = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/eventos', label: 'Eventos' },
  { to: '/libros', label: 'Libros' },
];


export function SiteHeader() {
  const { usuario, perfil, esAdmin, cargandoUsuario } = useAuth();

  const handleCerrarSesion = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link to="/" className="site-brand" aria-label="Rincón del Libro, inicio">
          <span className="site-brand-icon">
            <span className="site-book-symbol" aria-hidden="true">▤</span>
          </span>
          <span className="site-brand-copy">
            <strong>Rincón del Libro</strong>
            <small>Historias que nos unen</small>
          </span>
        </Link>

        <nav className="site-nav" aria-label="Navegación principal">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `site-nav-link${isActive ? ' is-active' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {!cargandoUsuario && (
          usuario && perfil ? (
            <div className="site-header-user">
              <span className="site-header-user-label">
                {esAdmin ? 'Administrador' : 'Mi cuenta'}
              </span>
              <button
                type="button"
                className="site-header-cta"
                onClick={handleCerrarSesion}
              >
                Cerrar sesión
              </button>
            </div>
          ) : (
            <Link className="site-header-cta" to="/registro">
              Crear cuenta <span aria-hidden="true">↗</span>
            </Link>
          )
        )}

        <button
          className="site-mobile-menu"
          aria-label="Abrir menú"
          onClick={() =>
            document.querySelector('.site-nav')?.classList.toggle('site-nav-open')
          }
        >
          ☰
        </button>
      </div>
    </header>
  );
}


export function SiteFooter() {
  return <footer className="site-footer-shared">
    <div className="site-footer-main">
      <div className="site-footer-brand"><Link to="/" className="site-brand footer-brand"><span className="site-brand-icon"><span className="site-book-symbol" aria-hidden="true">▤</span></span><span className="site-brand-copy"><strong>Rincón del Libro</strong><small>Historias que nos unen</small></span></Link><p>Un espacio para descubrir nuevas historias, compartir ideas y encontrar tu próxima lectura favorita.</p><div className="site-socials"><a href="https://www.instagram.com/" aria-label="Instagram"><span className="site-instagram-symbol" aria-hidden="true">◎</span></a><a href="https://www.facebook.com/" aria-label="Facebook"><span className="site-facebook-letter" aria-hidden="true">f</span></a><a href="mailto:contacto@elrincondellibro.com" aria-label="Correo electrónico"><span aria-hidden="true">✉</span></a></div></div>
      <div className="site-footer-column"><h3>Explorá</h3><Link to="/">Inicio</Link><Link to="/libros">Catálogo de libros</Link><Link to="/eventos">Eventos y actividades</Link><Link to="/nosotros">Sobre nosotros</Link></div>
      <div className="site-footer-column"><h3>La comunidad</h3><p>La próxima gran historia puede empezar con una página.</p><Link className="footer-join-link" to="/registro">Sumate a la comunidad <span aria-hidden="true">↗</span></Link><a href="mailto:contacto@elrincondellibro.com">contacto@elrincondellibro.com</a></div>
    </div>
    <div className="site-footer-bottom"><span>© {new Date().getFullYear()} Rincón del Libro. Todos los derechos reservados.</span><span>Hecho para quienes aman leer <span aria-hidden="true">♥</span></span></div>
  </footer>;
}

export default function SiteLayout({ children }) {
  return <div className="site-layout"><SiteHeader/><div className="site-layout-content">{children}</div><SiteFooter/></div>;
}
