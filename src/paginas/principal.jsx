import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // <-- AGREGALO AQUÍ
import '../css/principal.css';
import '../js/principal.js';
import principitoL from "../assets/imagenesL/principitoL.jpg";
import AnafrankL from "../assets/imagenesL/AnafrankL.jpg";
import leonbrujaropero from "../assets/imagenesL/leonbrujaropero.jpg";
import pinocho from "../assets/imagenesL/pinocho.jpg";
import gatosguerreros from "../assets/imagenesL/gatosguerreros.jpg";
import cruceL from "../assets/imagenesL/cruceL.jpg";
import fondomenu from "../assets/imagenesL/fondomenu.jpg"

export default function Principal() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);

  const libros = [
    {
      id: 1,
      titulo: 'Pinocho',
      autor: 'Carlo Collodi',
      descripcion: 'Un humilde carpintero llamado Geppetto fabrica un muñeco de madera que cobra vida. Tras meterse en constantes problemas y mentiras, deberá aprender sobre el esfuerzo y la honestidad para convertirse en un niño de verdad.',
      imagen: pinocho
    },
    {
      id: 2,
      titulo: 'Gatos Guerreros',
      autor: 'Erin Hunter',
      descripcion: 'Narra la historia de cuatro clanes de felinos salvajes que coexisten en un bosque guiados por sus propias leyes y un estricto código de honor.',
      imagen: gatosguerreros
    },
    {
      id: 3,
      titulo: 'El Principito',
      autor: 'Antoine de Saint-Exupéry',
      descripcion: 'Un cuento poético sobre un pequeño príncipe que viaja por el universo descubriendo la forma en que los adultos ven la vida.',
      imagen: principitoL
    },
    {
      id: 4,
      titulo: 'Ana Frank',
      autor: 'Ana Frank',
      descripcion: 'El diario de Ana Frank es el testimonio real de una niña judía de trece años que debe ocultarse junto a su familia para escapar de la persecución nazi.',
      imagen: AnafrankL
    },
    {
      id: 5,
      titulo: 'Cruce de caminos',
      autor: 'Naira Gamboa',
      descripcion: 'Novela de ficción psicológica centrada en las decisiones personales y cómo los caminos de distintas personas se entrelazan al enfrentar pérdidas o dilemas morales.',
      imagen: cruceL
    },
    {
      id: 6,
      titulo: 'El león, la bruja y el ropero',
      autor: 'C. S. Lewis',
      descripcion: 'Cuatro hermanos descubren un ropero mágico que los lleva a Narnia, un mundo dominado por un invierno eterno. Junto a Aslan, lucharán para liberar el reino.',
      imagen: leonbrujaropero
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    const bookCards = document.querySelectorAll('.custom-book-card');
    bookCards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Buscando:", searchTerm);
  };

  return (
    <div
      className="rincon-container"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.0), rgba(255, 255, 255, 0.20)), url(${fondomenu})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        minHeight: '100vh'
      }}
    >
      <header className="navbar navbar-expand-lg navbar-light bg-white border-bottom px-4 py-3 sticky-top shadow-sm">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-2">
            <div>
              <h2 className="h6 mb-0 fw-bold">Rincón del Libro</h2>
            </div>
          </div>

          <nav className="d-none d-lg-flex gap-4">
            <a href="#inicio" className="text-dark text-decoration-none fw-semibold active-link">Inicio</a>
            <a href="#libros" className="text-dark text-decoration-none fw-semibold">Libros</a>
            <a href="#sucursales" className="text-dark text-decoration-none fw-semibold">Eventos </a>
            <a href="#nosotros" className="text-dark text-decoration-none fw-semibold">Sobre nosotros</a>
          </nav>

          <div className="d-flex align-items-center gap-3">
            <button className="btn btn-link text-dark p-0">Buscar</button>
            <a className='btn btn-outline-ivory' href='/src/paginas/Registro.jsx'>Registrarse</a>
            <div className="position-relative">
              <button className="btn btn-link text-dark p-0">🛒</button>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">-</span>
            </div>
          </div>
        </div>
      </header>
      
      <section id="inicio" className="hero-section text-dark">
        <div className="hero-overlay"></div>
        <div className="container position-relative z-2 py-5">
          <div className="row">
            <div className="col-lg-7">
              <form className="input-group mb-4" onSubmit={handleSearch} style={{ maxWidth: '450px' }}>
                <input
                  type="text"
                  className="form-control py-2 fs-6"
                  placeholder="¿Qué libro buscas?"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </form>

              <span className="text-muted d-block mb-2">Te acompañamos con</span>
              <h1 className="display-3 fw-bold mb-3 font-serif">
                Libros para<br />
                cada momento y<br />
                lugar.
              </h1>
              <p className="lead mb-4 text-secondary">
                Tu libro favorito <br />
                ahora desde cualquier formato digital
              </p>

              <div className="d-flex gap-3 mb-5">
                <button className="btn btn-dark px-4 py-2 text-uppercase fw-semibold" style={{ fontSize: '0.8rem', letterSpacing: '1px' }}>
                  COMPRAR &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="libros" className="container py-5">
        <div className="text-center mb-5">
          <h2 className="font-serif display-6 fw-bold">Los más comprados</h2>
          <p className="text-muted">Desplaza hacia abajo para conocer los favoritos de los lectores</p>
        </div>

        <div className="row g-4 justify-content-center">
          {libros.map((libro, index) => (
            <div key={libro.id} className="col-12 col-md-6 col-lg-4 d-flex justify-content-center">
              <div 
                className="card custom-book-card shadow-sm border-0 h-100" 
                style={{ 
                  width: '18rem',
                  transitionDelay: `${(index % 3) * 0.15}s` // Retraso secuencial en cascada
                }}
              >
                {libro.imagen && (
                  <div className="card-img-container">
                    <img
                      src={libro.imagen}
                      className="card-img-top book-image"
                      alt={libro.titulo}
                    />
                  </div>
                )}

                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title font-serif fw-bold text-capitalize">{libro.titulo}</h5>
                    <h6 className="card-subtitle mb-2 text-muted fs-6">{libro.autor}</h6>
                    <p className="card-text text-secondary style-description" style={{ fontSize: '0.875rem' }}>
                      {libro.descripcion}
                    </p>
                  </div>
                  <a href="#comprar" className="btn btn-dark w-100 mt-3 fw-semibold">Ver Libro</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="btn btn-dark rounded-circle scroll-top-btn shadow-lg position-fixed bottom-0 end-0 m-4"
          aria-label="Volver arriba"
        >
          ↑
        </button>
      )}
    </div>
  );
}