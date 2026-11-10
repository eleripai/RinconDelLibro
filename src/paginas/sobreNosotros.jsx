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
      {/* CONTENIDO PRINCIPAL */}
      <main className="main-content">
        <div className="content-grid">
          {/* Columna Izquierda: Historia */}
          <section className="history-section">
            <span className="subtitle-tag">NUESTRA HISTORIA Y PASIÓN</span>
            <h2>libros para cada momento y lugar</h2>
            <p>
              En <strong>El rincón del libro</strong> hacemos de la lectura un espacio de calma, 
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
                  <p><FaMapMarkerAlt /> Av. Juan Julián Lastra</p>
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
                  <p><FaMapMarkerAlt /> Av. Dr. Ramón 355</p>
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
                Fundada con la pasión de compartir historias, El rincón del libro cuenta con una sólida trayectoria en el rubro editorial. Lo que comenzó como un pequeño proyecto ha crecido gracias a la confianza de nuestros lectores, manteniendo intacta nuestra vocación por cultivar la lectura durante más de diez años. Más que una librería, somos un espacio cercano donde conviven los grandes clásicos, las últimas novedades y una comunidad unida por el amor a los libros.
              </p>
              <div className="card-badges-row">
                <span className="small-tag">¡Gracias por ser parte de nuestra historia!</span>
                <span className="dot">•</span>
                <span className="small-tag">- El Rincón del Libro</span>
              </div>
              <div className="card-footer-info">
                <span className="circle-badge">RDL</span>
                <div>
                  <strong>Desde 2001 acompañándote</strong>
                  <small>Más de 20 años compartiendo lecturas</small>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}