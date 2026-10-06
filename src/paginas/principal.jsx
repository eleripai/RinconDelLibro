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
      <header className="encabezado-prin">
        <div className= "encabezado-contenedor" >
          <div className="encabezado-logo">
            <div>
              <h2 className="h6 mb-0 fw-bold">Rincón del Libro</h2>
            </div>
          </div>

          <nav className="menu-nagacion">
            <a href="#inicio" className="enlace-nav acitve-link">Inicio</a>
            <a href="#libros" className="enlace-nav">Libros</a>
            <a href="#eventos" className ="enlace-nav">Eventos</a>                 
            <a href="#nosotros" className ="enlace-nav">"Sobre nosotros</a>
          </nav>

          <div className="seccion-usuario-header">
            <button className="boton-buscar-header">Buscar</button>
            <Link className="boton-registro-header" to="/registro">Registrarse</Link>
            <div className="contenedor-carrito">
              <button className="boton-carrito">🛒</button>
              <span className="insignia-carrito">-</span>
            </div>
          </div>
        </div>
      </header>
      
      <section id="inicio" className="seccion-hero">
        <div className="hero-overlay"></div>
        <div className="hero-contenido">
          <div className="hero-columna">
            <form className="formulario-busqueda-hero" onSubmit={handleSearch}>
              <input
                type="text"
                className="campo-busqueda-hero"
                placeholder="¿Qué libro buscas?"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>

            <span className="hero-subtitulo">Te acompañamos con</span>
            <h1 className="hero-titulo font-serif">
              Libros para<br />
              cada momento y<br />
              lugar.
            </h1>
            <p className="hero-descripcion">
              Tu libro favorito <br />
              ahora desde cualquier formato digital
            </p>

            <div className="hero-acciones">
              <button className="boton-hero-comprar">
                COMPRAR &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="libros" className="container py-5">
        <div className="text-center mb-5">
          <h2 className="font-serif display-6 fw-bold">Los más comprados</h2>
          <p className="text-muted">Desplaza hacia abajo para conocer los favoritos de los lectores</p>
        </div>

        <section id="libros" className="seccion-catalogo">
        <div className="encabezado-catalogo">
          <h2 className="titulo-catalogo font-serif">Los más comprados</h2>
          <p className="subtitulo-catalogo">Desplaza hacia abajo para conocer los favoritos de los lectores</p>
        </div>

        <div className="grilla-libros">
          {libros.map((libro, index) => (
            <div key={libro.id} className="columna-tarjeta">
              <div 
                className="tarjeta-libro custom-book-card" 
                style={{ 
                  transitionDelay: `${(index % 3) * 0.15}s`
                }}
              >
                {libro.imagen && (
                  <div className="card-img-container">
                    <img
                      src={libro.imagen}
                      className="book-image"
                      alt={libro.titulo}
                    />
                  </div>
                )}

                <div className="cuerpo-tarjeta">
                  <div className="detalles-libro">
                    <h5 className="titulo-libro font-serif">{libro.titulo}</h5>
                    <h6 className="autor-libro">{libro.autor}</h6>
                    <p className="descripcion-libro">
                      {libro.descripcion}
                    </p>
                  </div>
                  <a href="#comprar" className="boton-ver-libro">Ver Libro</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BOTÓN VOLVER ARRIBA */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="scroll-top-btn"
          aria-label="Volver arriba"
        >
          ↑
        </button>
      )}
    </div>