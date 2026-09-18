import React, { useState, useEffect } from 'react';
import '../css/principal.css';
import principitoL from "../assets/imagenesL/principitoL.jpg";
import AnafrankL from "../assets/imagenesL/AnafrankL.jpg";
import gatosguerreros from "../assets/donquijoteL.jpg";

export default function Principal() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);

  const libros = [
    {
      id: 1,
      titulo: 'No hay verano sin ti',
      autor: 'Jenny Han',
      descripcion: 'Tras la dolorosa muerte de Susannah (la madre de los hermanos Fisher), el grupo está distanciado y Belly siente que este verano está perdido. Sin embargo, todo cambia cuando Conrad desaparece sin dejar rastro. Belly y Jeremiah viajan juntos a la casa de la playa en Cousins Beach para buscarlo, lo que reaviva la tensión del triángulo amoroso y los obliga a enfrentar su duelo y sus sentimientos.'
    },
    {
      id: 2,
      titulo: 'Principito',
      autor: 'Antoine de Saint-Exupéry.',
      descripcion: 'El principito cuenta la historia de un aviador que se queda varado en medio del desierto del Sahara tras sufrir una avería en su avión. Lejos de la civilización, se encuentra con un misterioso pequeño príncipe que viene de un asteroide lejano.'
    },
    {
      id: 3,
      titulo: 'Gatos Guerreros',
      autor: 'Erin Hunter',
      descripcion: 'Los gatos guerreros narra la historia de cuatro clanes de felinos salvajes —el Clan del Trueno, el Clan del Río, el Clan del Viento y el Clan de la Sombra— que coexisten en un bosque guiados por sus propias leyes y un estricto código de honor.',
    },
    {
      id: 4,
      titulo: 'El Principito',
      autor: 'Antoine de Saint-Exupéry',
      descripcion: 'Un cuento poético sobre un pequeño príncipe que viaja por el universo descubriendo la forma en que los adultos ven la vida.',
      imagen: principitoL
    },
    {
      id: 5,
      titulo: 'Ana Frank',
      autor: 'Ana frank',
      descripcion: 'El diario de Ana Frank es el testimonio real de una niña judía de trece años que debe ocultarse junto a su familia y otras cuatro personas en un escondite secreto en Ámsterdam, con el fin de escapar de la persecución nazi durante la Segunda Guerra Mundial.', 
      imagen: AnafrankL
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
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.85)), url('https://w0.peakpx.com/wallpaper/286/775/HD-wallpaper-library-architecture-house-cool-fun.jpg')`,
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
            <a href="#categorias" className="text-dark text-decoration-none fw-semibold">Categorías</a>
            <a href="#sucursales" className="text-dark text-decoration-none fw-semibold">Eventos de la biblioteca</a>
            <a href="#nuevos" className="text-dark text-decoration-none fw-semibold">Club de lectura</a>
            <a href="#nosotros" className="text-dark text-decoration-none fw-semibold">Sobre nosotros</a>
          </nav>

          <div className="d-flex align-items-center gap-3">
            <button className="btn btn-link text-dark p-0">Buscar</button>
            <button className="btn btn-link text-dark p-0">Perfil</button>
            <div className="position-relative">
              <button className="btn btn-link text-dark p-0">Carrito</button>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">2</span>
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
                <button className="btn btn-dark px-4 fw-semibold" type="submit">Buscar</button>
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
          {libros.map((libro) => (
            <div key={libro.id} className="col-12 col-md-6 col-lg-4 d-flex justify-content-center">
              <div className="card shadow-sm border-0 h-100" style={{ width: '18rem' }}>
                {libro.imagen && (
                  <img
                    src={libro.imagen}
                    className="card-img-top"
                    alt={libro.titulo}
                    style={{ height: '260px', objectFit: 'cover' }}
                  />
                )}

                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title font-serif fw-bold">{libro.titulo}</h5>
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