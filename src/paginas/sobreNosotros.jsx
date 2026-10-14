import React from 'react';
import { Link } from 'react-router-dom';
import '../css/sobreNosotros.css';
import { 
  FaBook, 
  FaMapMarkerAlt, 
  FaClock, 
  FaEnvelope, 
  FaPhone, 
  FaInstagram, 
  FaFacebookF, 
  FaTwitter, 
  FaSearch 
} from 'react-icons/fa';
export default function SobreNosotros() {
  return (
    <div className="sobre-nosotros-container">
      {/* HEADER / NAVEGACIÓN */}
    <header className="encabezado-prin">
  <div className="encabezado-contenedor">
    <div className="encabezado-logo">
      <div>
        <h2 className="h6 mb-0 fw-bold">Rincón del Libro</h2>
      </div>
    </div>

    <nav className="menu-nagacion">
      <a href="/Principal" className="enlace-nav acitve-link">Inicio</a>
      <a href="#libros" className="enlace-nav">Libros</a>
      <a href="/eventos" className="enlace-nav">Eventos</a>                 
      <a href="#nosotros" className="enlace-nav">Sobre nosotros</a>
    </nav>

    <div className="seccion-usuario-header">
            <Link className="boton-registro-header" to="/registro">Registrarse</Link>
            <div className="contenedor-carrito">
              <button className="boton-carrito">🛒</button>
              <span className="insignia-carrito">-</span>
            </div>
          </div>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="main-content">
        <div className="content-grid">
          {/* Columna Izquierda: Historia */}
          <section className="history-section">
            <span className="subtitle-tag">NUESTRA HISTORIA Y PASIÓN</span>
            <h2>libros para cada momento y lugar</h2>
            <p>
              En <strong>El rincón del libro</strong> Hacemos de la lectura un espacio de calma, 
              descubrimiento y conexión. Te ofrecemos cada libro con la dedicación que 
              merece TU historia.
            </p>

            <div className="branches-container">
              <h3>Nuestras Sucursales</h3>
              
              <div className="branch-cards-grid">
                {/* Sucursal 1 */}
                <div className="branch-card">
                  <div className="branch-title"><FaMapMarkerAlt /> <h4>Sucursal Jumbo</h4></div>
                  <p><FaClock /> Lunes a Sáb: 9:00 - 20:00 hs</p>
                  <p><FaMapMarkerAlt /> A, Juan Julian Lastra.</p>
                  <span className="badge-tag">INCLUYE SECTOR LECTURA</span>
                </div>

                {/* Sucursal 2 */}
                <div className="branch-card">
                  <div className="branch-title"><FaMapMarkerAlt /> <h4>Sucursal Centro</h4></div>
                  <p><FaClock /> Lunes a Dom: 10:00 - 21:00 hs</p>
                  <p><FaMapMarkerAlt /> Calle Av. 123</p>
                  <span className="badge-tag">SECTOR DE LECTURA</span>
                </div>

                {/* Sucursal 3 */}
                <div className="branch-card">
                  <div className="branch-title"><FaMapMarkerAlt /> <h4>Sucursal Alto Comahue Shopping</h4></div>
                  <p><FaClock /> Lunes a Vie: 9:00 - 18:00 hs</p>
                  <p><FaMapMarkerAlt /> Av. Dr.Ramon 355</p>
                  <span className="badge-tag">SECTOR DE LECTURA</span>
                </div>
              </div>
            </div>
          </section>

          {/* Columna Derecha: Tarjeta Destacada */}
          <aside className="highlight-sidebar">
            <div className="refugio-card">
              <div className="card-top-icon"><FaBook /></div>
              <h3>Nuestra historia</h3>
              <p>
               Fundada con la pasión de compartir historias, El rincón del libro cuenta con una sólida trayectoria en el rubro editorial. Lo que comenzó como un pequeño proyecto ha crecido gracias a la confianza de nuestros lectores, manteniendo intacta nuestra vocación por cultivar la lectura durante mas de diez años!. Más que una librería, somos un espacio cercano donde conviven los grandes clásicos, las últimas novedades y una comunidad unida por el amor a los libros.
              </p>
              <div className="card-badges-row">
                <span className="small-tag">Gracias por ser parte de nuestra historia!</span>
                <span className="dot">•</span>
                <span className="small-tag">-El Rincon del Libro</span>
              </div>
              <div className="card-footer-info">
                <span className="circle-badge">RDL</span>
                <div>
                  <strong>Desde 2001 acompañandote</strong>
                  <small>Más de 20 años divirtiendo lecturas</small>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* FOOTER (PIE DE PÁGINA) */}
      <footer className="site-footer">
        <div className="footer-content">
          <div className="footer-col brand-col">
            <div className="footer-logo">
              <span className="f-icon"><FaBook /></span>
              <h3>El Rincón del Libro</h3>
            </div>
            <p>Un rincón con años de historia, comprometido con el trato personalizado, el buen consejo y el placer de leer.</p>
          </div>

          <div className="footer-col nav-col">
            <h4>Navegación</h4>
            <ul>
              <li><a href="#inicio">Inicio</a></li>
              <li><a href="#catalogo">Catálogo</a></li>
              <li><a href="#nosotros">Sobre Nosotros</a></li>
              <li><a href="#club">Club de Lectura</a></li>
            </ul>
          </div>

          <div className="footer-col contact-col">
            <h4>Contacto</h4>
            <p><FaEnvelope /> contacto@elrincondellibro.com</p>
            <p><FaPhone /> +54 (03) 4567-8900</p>
          </div>

          <div className="footer-col social-col">
            <h4>Comunidad</h4>
            <div className="social-icons">
              <a href="#instagram"><FaInstagram /></a>
              <a href="#facebook"><FaFacebookF /></a>
              <a href="#twitter"><FaTwitter /></a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 El Rincón del Libro - Librería & Editorial. Todos los derechos reservados.</p>
          <div className="footer-links">
            <a href="#terminos">Términos & Condiciones</a>
            <a href="#privacidad">Política de Privacidad</a>
          </div>
        </div>
      </footer>
    </div>
  );
}