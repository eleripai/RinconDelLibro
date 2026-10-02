import React, { useState } from 'react';
import '../css/eventos.css';
import { Link, useLocation } from "react-router-dom";
import { 
  Search, 
  BookOpen, 
  Video, 
  MapPin, 
  Calendar, 
  Users, 
  ChevronRight, 
  CheckCircle2, 
  Ticket, 
  X,
  Clock,
  User,
  Mail,
  Phone,
  Trash2
} from 'lucide-react';

const EVENTOS_INICIALES = [
  {
    id: 1,
    titulo: 'Conversatorio: "cien años"',
    autor: 'Gabriel García Márquez',
    libro: 'Cien años de soledad',
    fecha: '30 de mayo de 1967',
    horarios: ['17:00 HS', '18:30 HS', '20:00 HS'],
    formato: 'Presencial',
    lugar: 'Librería Central - Salón Principal (Madrid)',
    categoria: 'conversatorio',
    cuposTotales: 80,
    cuposReservados: 65,
    imagen: '/imagenesL/cienaños.jpg',
    descripcion: 'relata la saga de siete generaciones de la familia Buendía en el pueblo de Macondo. A través del realismo mágico, la obra entrelaza la soledad, el amor, los conflictos políticos y el destino trágico de sus personajes, reflejando de forma alegórica la historia de América Latina.'

  },
  {
    id: 2,
    titulo: 'Club de Lectura: Debate sobre "Dune"',
    autor: 'Frank Herbert',
    libro: 'Dune',
    fecha: '2026-10-12',
    horarios: ['18:00 HS', '19:30 HS'],
    formato: 'Virtual',
    lugar: 'Zoom (Enlace enviado tras confirmar)',
    categoria: 'Club de Lectura',
    cuposTotales: 30,
    cuposReservados: 28,
    imagen: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
    descripcion: 'Sesión interactiva de debate sobre la construcción del mundo, la ecología y la política en la gran obra maestra de la ciencia ficción.'
  },
  {
    id: 3,
    titulo: 'Firma de Ejemplares: "La Sombra del Viento"',
    autor: 'Carlos Ruiz Zafón (Homenaje)',
    libro: 'La Sombra del Viento',
    fecha: '2026-10-18',
    horarios: ['16:00 HS', '17:30 HS', '19:00 HS'],
    formato: 'Presencial',
    lugar: 'Feria del Libro - Stand 42 (Barcelona)',
    categoria: 'Firma',
    cuposTotales: 150,
    cuposReservados: 140,
    imagen: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=800&q=80',
    descripcion: 'Encuentro especial con ilustradores y editores de la edición conmemorativa. Incluye sello de colección para tu libro.'
  },
  {
    id: 4,
    titulo: 'Taller informativo: Piense y hágase rico',
    autor: 'Napoleon Hill',
    libro: 'El Día que se Perdió la Cordura',
    fecha: '2026-10-25',
    horarios: ['22:00 HS', '19:00 HS'],
    formato: 'Virtual',
    lugar: 'Google Meet',
    categoria: 'Taller',
    cuposTotales: 25,
    cuposReservados: 25,
    imagen: '/imagenesL/napoleon.jpg',
    descripcion: 'Aprende a estructurar la geografía, mitología, reglas de magia y tensión narrativa para tu propia novela.'
  },
  {
    id: 5,
    titulo: 'Encuentro con la Autora: Boulevard',
    autor: 'Flor M. Salvador',
    libro: 'Cien Años de Soledad',
    fecha: '2026-11-02',
    horarios: ['18:00 HS', '20:00 HS'],
    formato: 'Presencial',
    lugar: 'Biblioteca Gabriel García Márquez (Bogotá)',
    categoria: 'Presentación',
    cuposTotales: 60,
    cuposReservados: 40,
    imagen: '/imagenesL/boulevard.jpg',
    descripcion: 'narra la intensa e inolvidable historia de Luke Howland y Hasley Weigel, dos jóvenes con realidades opuestas que cruzan sus caminos en un boulevard metafórico de emociones, adicciones y superación personal. En esta actividad exploraremos los temas centrales de la obra —el duelo, la salud mental, el amor juvenil y el impacto de las decisiones emocionales— en un espacio interactivo de debate y reflexión compartida.'
  },
  {
    id: 6,
    titulo: 'Club de Lectura:El Principito',
    autor: 'Antoine de Saint-Exupéry',
    libro: 'El Principito (Le Petit Prince)',
    fecha: '6 de abril de 1943',
    horarios: ['20:00 HS', '21:30 HS'],
    formato: 'Presencial',
    lugar: 'Café Literario "El Desván" (Santiago)',
    categoria: 'Club de Lectura',
    cuposTotales: 40,
    cuposReservados: 15,
    imagen: '/imagenesL/principitoL.jpg',
    descripcion: 'es una obra maestra de la literatura universal que, bajo la apariencia de un cuento infantil, aborda profundas reflexiones filosóficas sobre la naturaleza humana, el amor, la amistad, la soledad y el sentido de la vida.'
  },
  {
    id: 7,
    titulo: ' Estreno: Orgullo y Prejuicio ',
    autor: 'Jane Austen',
    libro: 'Orgullo y Prejuicio',
    fecha: '2026-11-15',
    horarios: ['11:00 HS', '16:00 HS', '18:00 HS'],
    formato: 'presencial',
    lugar: 'Microsoft Teams',
    categoria: 'estreno',
    cuposTotales: 100,
    cuposReservados: 52,
    imagen: '/imagenesL/orgullo.png',
    descripcion: 'Exploramos cómo las narrativas y la sátira social de Jane Austen siguen influyendo en las historias románticas contemporáneas.'
  }
];

export default function SeccionEventos() {
  const [eventos, setEventos] = useState(EVENTOS_INICIALES);
  const [busqueda, setBusqueda] = useState('');
  const [categoriaSel, setCategoriaSel] = useState('Todas');
  const [formatoSel, setFormatoSel] = useState('Todos');
  
  const [reservasConfirmadas, setReservasConfirmadas] = useState({});
  const [modalEvento, setModalEvento] = useState(null);
  const [horarioSeleccionado, setHorarioSeleccionado] = useState('');
  const [datosUsuario, setDatosUsuario] = useState({ nombre: '', email: '', telefono: '' });
  const [errorFormulario, setErrorFormulario] = useState('');
  
  // Estado para desplegar la lista de inscripciones en el header
  const [verMisReservas, setVerMisReservas] = useState(false);

  const location = useLocation();

  const totalReservas = Object.keys(reservasConfirmadas).length;

  const eventosFiltrados = eventos.filter((ev) => {
    const coincideTexto = 
      ev.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      ev.autor.toLowerCase().includes(busqueda.toLowerCase()) ||
      ev.libro.toLowerCase().includes(busqueda.toLowerCase());

    const coincideCategoria = categoriaSel === 'Todas' || ev.categoria === categoriaSel;
    const coincideFormato = formatoSel === 'Todos' || ev.formato === formatoSel;

    return coincideTexto && coincideCategoria && coincideFormato;
  });

  const abrirModal = (evento) => {
    setModalEvento(evento);
    const reservaPrevia = reservasConfirmadas[evento.id];
    
    if (reservaPrevia) {
      setHorarioSeleccionado(reservaPrevia.horario);
      setDatosUsuario({
        nombre: reservaPrevia.nombre,
        email: reservaPrevia.email,
        telefono: reservaPrevia.telefono
      });
    } else {
      setHorarioSeleccionado(evento.horarios[0] || '');
      setDatosUsuario({ nombre: '', email: '', telefono: '' });
    }
    setErrorFormulario('');
  };

  const cerrarModal = () => {
    setModalEvento(null);
    setErrorFormulario('');
  };

  const handleConfirmarReserva = (e) => {
    e.preventDefault();
    if (!datosUsuario.nombre.trim() || !datosUsuario.email.trim() || !datosUsuario.telefono.trim()) {
      setErrorFormulario('Por favor completa todos los campos para quedar anotada.');
      return;
    }

    const eventoId = modalEvento.id;
    const yaTeniaReserva = !!reservasConfirmadas[eventoId];

    setReservasConfirmadas({
      ...reservasConfirmadas,
      [eventoId]: {
        horario: horarioSeleccionado,
        titulo: modalEvento.titulo,
        fecha: modalEvento.fecha,
        lugar: modalEvento.lugar,
        ...datosUsuario
      }
    });

    if (!yaTeniaReserva) {
      setEventos(eventos.map(ev => 
        ev.id === eventoId ? { ...ev, cuposReservados: ev.cuposReservados + 1 } : ev
      ));
    }

    cerrarModal();
  };

  const handleCancelarReserva = (eventoId) => {
    const nuevasReservas = { ...reservasConfirmadas };
    delete nuevasReservas[eventoId];
    setReservasConfirmadas(nuevasReservas);

    setEventos(eventos.map(ev => 
      ev.id === eventoId ? { ...ev, cuposReservados: ev.cuposReservados - 1 } : ev
    ));

    if (modalEvento && modalEvento.id === eventoId) {
      cerrarModal();
    }
  };

  return (
    <section className="eventos-section" style={{ paddingTop: '80px' }}>
      
      {/* Header con menú desplegable de inscripciones */}
      <header className="navbar navbar-expand-lg navbar-light bg-white border-bottom px-4 py-3 fixed-top top-0 start-0 w-100 shadow-sm z-3">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-2">
            <div>
              <h2 className="h6 mb-0 fw-bold">Rincón del Libro</h2>
            </div>
          </div>

          <nav className="d-none d-lg-flex gap-4">
            <Link 
              to="/" 
              className={`text-dark text-decoration-none fw-semibold pb-1 ${location.pathname === '/' ? 'border-bottom border-2 border-dark font-bold' : ''}`}
            >
              Inicio
            </Link>
            <Link 
              to="/libros" 
              className={`text-dark text-decoration-none fw-semibold pb-1 ${location.pathname === '/libros' ? 'border-bottom border-2 border-dark font-bold' : ''}`}
            >
              Libros
            </Link>
            <Link 
              to="/categorias" 
              className={`text-dark text-decoration-none fw-semibold pb-1 ${location.pathname === '/categorias' ? 'border-bottom border-2 border-dark font-bold' : ''}`}
            >
              Categorías
            </Link>
            <Link 
              to="/eventos" 
              className={`text-dark text-decoration-none fw-semibold pb-1 ${location.pathname === '/eventos' ? 'border-bottom border-2 border-dark font-bold' : ''}`}
            >
              Eventos de la biblioteca
            </Link>
            <Link 
              to="/club-lectura" 
              className={`text-dark text-decoration-none fw-semibold pb-1 ${location.pathname === '/club-lectura' ? 'border-bottom border-2 border-dark font-bold' : ''}`}
            >
              Club de lectura
            </Link>
            <Link 
              to="/nosotros" 
              className={`text-dark text-decoration-none fw-semibold pb-1 ${location.pathname === '/nosotros' ? 'border-bottom border-2 border-dark font-bold' : ''}`}
            >
              Sobre nosotros
            </Link>
          </nav>

          <div className="d-flex align-items-center gap-3">
            <button className="btn btn-link text-dark p-0">
              <Search size={20} />
            </button>
            <button className="btn btn-link text-dark p-0">
              <User size={20} />
            </button>

            {/* Menú Desplegable de Eventos Inscritos */}
            <div className="position-relative">
              <button 
                onClick={() => setVerMisReservas(!verMisReservas)} 
                className="btn btn-link text-dark p-0 position-relative"
                title="Mis eventos inscriptos"
              >
                <Ticket size={22} />
                {totalReservas > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">
                    {totalReservas}
                  </span>
                )}
              </button>

              {/* Popover / Desplegable */}
              {verMisReservas && (
                <div 
                  className="position-absolute end-0 mt-2 bg-white border rounded shadow-lg p-3" 
                  style={{ width: '320px', zIndex: 1000 }}
                >
                  <div className="d-flex justify-content-between align-items-center mb-2 pb-2 border-bottom">
                    <h6 className="mb-0 fw-bold" style={{ color: 'var(--c-bistre)' }}>Mis Eventos Reservados</h6>
                    <button onClick={() => setVerMisReservas(false)} className="btn btn-sm btn-link text-secondary p-0">
                      <X size={16} />
                    </button>
                  </div>

                  {totalReservas === 0 ? (
                    <p className="text-muted text-center my-3" style={{ fontSize: '0.85rem' }}>
                      No te has inscripto a ningún evento todavía.
                    </p>
                  ) : (
                    <div style={{ maxHeight: '250px', overflowY: 'auto' }}>
                      {Object.entries(reservasConfirmadas).map(([id, res]) => (
                        <div key={id} className="p-2 mb-2 rounded bg-light border d-flex justify-content-between align-items-start">
                          <div>
                            <p className="fw-bold mb-1" style={{ fontSize: '0.85rem', color: 'var(--c-bistre)' }}>
                              {res.titulo}
                            </p>
                            <p className="text-muted mb-1" style={{ fontSize: '0.75rem' }}>
                              📅 {res.fecha} | ⏰ {res.horario}
                            </p>
                            <span className="badge bg-secondary" style={{ fontSize: '0.65rem' }}>
                              Inscripto: {res.nombre}
                            </span>
                          </div>
                          <button 
                            onClick={() => handleCancelarReserva(Number(id))}
                            className="btn btn-link text-danger p-0 ms-2"
                            title="Cancelar inscripción"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

          </div>
        </div>
      </header>

      <div className="eventos-container">
        
        <div className="filtros-bar">
          <div className="input-container">
            <Search className="input-icon" />
            <input
              type="text"
              placeholder="Buscar por libro, autor o título..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="input-busqueda"
            />
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <select
              value={categoriaSel}
              onChange={(e) => setCategoriaSel(e.target.value)}
              className="select-filtro"
            >
              <option value="Todas">Todas las categorías</option>
              <option value="Presentación">Presentaciones</option>
              <option value="Club de Lectura">Club de Lectura</option>
              <option value="Firma">Firma de Libros</option>
              <option value="Taller">Talleres</option>
            </select>

            <select
              value={formatoSel}
              onChange={(e) => setFormatoSel(e.target.value)}
              className="select-filtro"
            >
              <option value="Todos">Todos los formatos</option>
              <option value="Presencial">Presencial 📍</option>
              <option value="Virtual">Virtual 💻</option>
            </select>
          </div>
        </div>

        {eventosFiltrados.length === 0 ? (
          <div className="evento-card" style={{ padding: '4rem 2rem', textAlign: 'center', justifyContent: 'center' }}>
            <BookOpen style={{ width: '3rem', height: '3rem', margin: '0 auto 1rem auto', color: 'var(--c-golden-brown)' }} />
            <p className="eventos-subtitle">No se encontraron eventos con los filtros seleccionados.</p>
            <button 
              onClick={() => { setBusqueda(''); setCategoriaSel('Todas'); setFormatoSel('Todos'); }}
              className="btn-secondary"
              style={{ marginTop: '1rem' }}
            >
              Restablecer filtros
            </button>
          </div>
        ) : (
          <div className="eventos-grid">
            {eventosFiltrados.map((ev) => {
              const estaReservado = !!reservasConfirmadas[ev.id];
              const estaAgotado = ev.cuposReservados >= ev.cuposTotales;

              return (
                <article key={ev.id} className="evento-card">
                  <div className="evento-img-wrapper">
                    <img src={ev.imagen} alt={ev.libro} className="evento-img" />
                    <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem' }}>
                      <span className="badge-categoria">
                        {ev.formato === 'Virtual' ? <Video size={12} /> : <MapPin size={12} />}
                        {ev.formato}
                      </span>
                    </div>
                  </div>

                  <div className="evento-content">
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', marginBottom: '0.5rem' }}>
                        <span style={{ color: 'var(--c-dark-moss-green)', fontWeight: 700 }}>{ev.categoria}</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-secondary)' }}>
                          <Calendar size={13} style={{ color: 'var(--c-golden-brown)' }} />
                          {ev.fecha}
                        </div>
                      </div>

                      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '0 0 0.4rem 0', color: 'var(--c-bistre)' }}>
                        {ev.titulo}
                      </h3>

                      <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', margin: 0 }}>
                        Libro: <strong style={{ color: 'var(--c-bistre)' }}>{ev.libro}</strong> ({ev.autor})
                      </p>

                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <MapPin size={13} />
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ev.lugar}</span>
                      </p>

                      {estaReservado && (
                        <div style={{ marginTop: '0.6rem', padding: '0.35rem 0.6rem', background: 'var(--bg-badge)', border: '1px solid var(--c-apple-green)', borderRadius: '6px', fontSize: '0.75rem', color: 'var(--c-dark-moss-green)', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                          <Clock size={12} /> Anotada para las {reservasConfirmadas[ev.id].horario}
                        </div>
                      )}
                    </div>

                    <div style={{ paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        <Users size={13} />
                        <span>{ev.cuposTotales - ev.cuposReservados} libres</span>
                      </div>

                      <div className="evento-actions">
                        <button
                          onClick={() => abrirModal(ev)}
                          className="btn-secondary"
                          title="Ver detalles e inscripciones"
                        >
                          <ChevronRight size={18} />
                        </button>

                        <button
                          disabled={estaAgotado && !estaReservado}
                          onClick={() => abrirModal(ev)}
                          className={
                            estaReservado
                              ? 'btn-reserved'
                              : estaAgotado
                              ? 'btn-disabled'
                              : 'btn-primary'
                          }
                        >
                          {estaReservado ? (
                            <>
                              <CheckCircle2 size={14} /> Anotada
                            </>
                          ) : estaAgotado ? (
                            'Agotado'
                          ) : (
                            <>
                              <Ticket size={14} /> Reservar
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {modalEvento && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button onClick={cerrarModal} className="btn-secondary modal-close">
                <X size={16} />
              </button>

              <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--c-dark-moss-green)', marginBottom: '0.25rem' }}>
                <span>{modalEvento.categoria}</span>
                <span>•</span>
                <span>{modalEvento.formato}</span>
              </div>

              <h3 style={{ fontSize: '1.35rem', fontWeight: 700, margin: '0 0 0.25rem 0', color: 'var(--c-bistre)' }}>
                {modalEvento.titulo}
              </h3>
              
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                Libro: <strong style={{ color: 'var(--c-bistre)' }}>{modalEvento.libro}</strong> por {modalEvento.autor}
              </p>

              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1rem' }}>
                {modalEvento.descripcion}
              </p>

              <form onSubmit={handleConfirmarReserva} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--c-bistre)', display: 'block', marginBottom: '0.4rem' }}>
                    1. Selecciona tu Horario:
                  </label>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {modalEvento.horarios.map((hora) => (
                      <button
                        type="button"
                        key={hora}
                        onClick={() => setHorarioSeleccionado(hora)}
                        style={{
                          padding: '0.4rem 0.8rem',
                          borderRadius: 'var(--radius-md)',
                          border: horarioSeleccionado === hora ? '2px solid var(--c-dark-moss-green)' : '1px solid var(--border-subtle)',
                          background: horarioSeleccionado === hora ? 'var(--c-flax)' : 'var(--bg-input)',
                          color: 'var(--c-bistre)',
                          fontWeight: horarioSeleccionado === hora ? 700 : 500,
                          fontSize: '0.8rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.3rem'
                        }}
                      >
                        <Clock size={12} /> {hora}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--c-bistre)', display: 'block', marginBottom: '0.4rem' }}>
                    2. Tus Datos para Confirmar la Asistencia:
                  </label>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div className="input-container">
                      <User className="input-icon" />
                      <input
                        type="text"
                        placeholder="Nombre y Apellido completo"
                        value={datosUsuario.nombre}
                        onChange={(e) => setDatosUsuario({ ...datosUsuario, nombre: e.target.value })}
                        className="input-busqueda"
                      />
                    </div>

                    <div className="input-container">
                      <Mail className="input-icon" />
                      <input
                        type="email"
                        placeholder="Correo electrónico"
                        value={datosUsuario.email}
                        onChange={(e) => setDatosUsuario({ ...datosUsuario, email: e.target.value })}
                        className="input-busqueda"
                      />
                    </div>

                    <div className="input-container">
                      <Phone className="input-icon" />
                      <input
                        type="tel"
                        placeholder="Teléfono / WhatsApp"
                        value={datosUsuario.telefono}
                        onChange={(e) => setDatosUsuario({ ...datosUsuario, telefono: e.target.value })}
                        className="input-busqueda"
                      />
                    </div>
                  </div>
                </div>

                {errorFormulario && (
                  <p style={{ color: '#d32f2f', fontSize: '0.75rem', margin: 0, fontWeight: 600 }}>
                    {errorFormulario}
                  </p>
                )}

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                  {reservasConfirmadas[modalEvento.id] && (
                    <button
                      type="button"
                      onClick={() => handleCancelarReserva(modalEvento.id)}
                      style={{ background: 'rgba(211, 47, 47, 0.1)', color: '#d32f2f', border: '1px solid #d32f2f', borderRadius: 'var(--radius-md)', padding: '0.55rem 0.9rem', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}
                    >
                      Cancelar Reserva
                    </button>
                  )}

                  <button type="submit" className="btn-primary">
                    {reservasConfirmadas[modalEvento.id] ? 'Guardar Cambios' : 'Confirmar e Inscribirme'}
                  </button>
                </div>

              </form>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}