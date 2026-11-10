import React, { useEffect, useMemo, useState } from 'react';
import {
  collection, doc, onSnapshot, runTransaction, setDoc, deleteDoc,
  serverTimestamp, getDocs
} from 'firebase/firestore';
import { db } from '../firebase.js';
import { useAuth } from '../contextos/AuthContext.jsx';
import '../css/eventos.css';
import imagenCienAnos from '../assets/imagenesL/cien-anos.jpg';
import imagenTerror from '../assets/imagenesL/terror.jpg';
import imagenLaVida from '../assets/imagenesL/lavida.jpg';
import imagenPiense from '../assets/imagenesL/piense.jpg';
import imagenBoulevard from '../assets/imagenesL/boulevard.jpg';
import imagenPrincipito from '../assets/imagenesL/principitoL.jpg';
import imagenOrgullo from '../assets/imagenesL/orgullo.png';
import {
  Search, BookOpen, Video, MapPin, Calendar, Users, ChevronRight,
  CheckCircle2, Ticket, X, Clock, User, Mail, Phone, Trash2, Plus,
  Pencil, ShieldCheck
} from 'lucide-react';

const EVENTOS_INICIALES = [
  {
    id: 1,
    titulo: 'Conversatorio: "cien años"',
    autor: 'Gabriel García Márquez',
    libro: 'Cien años de soledad',
    fecha: '2027-06-15',
    horarios: ['17:00 HS', '18:30 HS', '20:00 HS'],
    formato: 'Presencial',
    lugar: 'Librería Central - Salón Principal (Madrid)',
    categoria: 'Ficción literaria',
    cuposTotales: 80,
    cuposReservados: 65,
    imagen: imagenCienAnos,
    descripcion: 'relata la saga de siete generaciones de la familia Buendía en el pueblo de Macondo. A través del realismo mágico, la obra entrelaza la soledad, el amor, los conflictos políticos y el destino trágico de sus personajes, reflejando de forma alegórica la historia de América Latina.'

  },
  {
    id: 2,
    titulo: 'Club de Lectura: La casa de las sombras"',
    autor: 'Adam Nevill',
    libro: 'La casa de las sombras',
    fecha: '2026-10-12',
    horarios: ['18:00 HS', '19:30 HS'],
    formato: 'Virtual',
    lugar: 'Zoom (Enlace enviado tras confirmar)',
    categoria: 'terror',
    cuposTotales: 30,
    cuposReservados: 28,
    imagen: imagenTerror,
    descripcion: 'una casa inquietante que esconde secretos perturbadores. A medida que se revelan los misterios del lugar, los protagonistas se enfrentan a fenómenos inexplicables y situaciones aterradoras que los llevan al límite entre la realidad y lo sobrenatural.'
  },
  {
    id: 3,
    titulo: 'Conferencia: La vida secreta de la mente',
    autor: ' Mariano Sigman',
    libro: 'La vida secreta de la mente',
    fecha: '2026-10-18',
    horarios: ['16:00 HS', '17:30 HS', '19:00 HS'],
    formato: 'Presencial',
    lugar: 'Feria del Libro - Stand 42 (Barcelona)',
    categoria: 'neurociencia/psicología experimental',
    cuposTotales: 150,
    cuposReservados: 140,
    imagen: imagenLaVida,
    descripcion: 'En este encuentro analizaremos los descubrimientos más impactantes sobre el cerebro humano y su aplicación práctica en el desarrollo personal, la toma de decisiones y el pensamiento crítico.'
  },
  {
    id: 4,
    titulo: 'Taller informativo: Piense y hágase rico',
    autor: 'Napoleon Hill',
    libro: 'Piense y hágase rico',
    fecha: '2026-10-25',
    horarios: ['22:00 HS', '19:00 HS'],
    formato: 'Virtual',
    lugar: 'Google Meet',
    categoria: 'Desarrollo personal / Autoayuda',
    cuposTotales: 25,
    cuposReservados: 25,
    imagen: imagenPiense,
    descripcion: 'Napoleon Hill sintetiza 13 principios para alcanzar el éxito, la riqueza y la autosuperación a través del poder de la mente, la fe y la perseverancia. En este encuentro analizaremos cómo aplicar sus enseñanzas al contexto profesional y personal actual.'
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
    categoria: 'Juvenil / Romance dramático',
    cuposTotales: 60,
    cuposReservados: 40,
    imagen: imagenBoulevard,
    descripcion: 'narra la intensa e inolvidable historia de Luke Howland y Hasley Weigel, dos jóvenes con realidades opuestas que cruzan sus caminos en un boulevard metafórico de emociones, adicciones y superación personal. En esta actividad exploraremos los temas centrales de la obra —el duelo, la salud mental, el amor juvenil y el impacto de las decisiones emocionales— en un espacio interactivo de debate y reflexión compartida.'
  },
  {
    id: 6,
    titulo: 'Club de Lectura:El Principito',
    autor: 'Antoine de Saint-Exupéry',
    libro: 'El Principito (Le Petit Prince)',
    fecha: '2027-08-16',
    horarios: ['20:00 HS', '21:30 HS'],
    formato: 'Presencial',
    lugar: 'Café Literario "El Desván" (Santiago)',
    categoria: 'Literatura infantil',
    cuposTotales: 40,
    cuposReservados: 15,
    imagen: imagenPrincipito,
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
    categoria: 'Novela clásica',
    cuposTotales: 100,
    cuposReservados: 52,
    imagen: imagenOrgullo,
    descripcion: 'Exploramos cómo las narrativas y la sátira social de Jane Austen siguen influyendo en las historias románticas contemporáneas.'
  }
];

const EVENTOS_COLLECTION = 'eventos';

function normalizarEvento(ev) {
  const total = Number(ev.totalEntradas ?? ev.cuposTotales ?? 0);
  const stock = Number(ev.stock ?? Math.max(0, total - Number(ev.cuposReservados || 0)));
  return {
    ...ev,
    id: String(ev.id),
    totalEntradas: total,
    stock: Math.max(0, stock),
    horarios: Array.isArray(ev.horarios) ? ev.horarios : [],
    formato: String(ev.formato || 'Presencial').toLowerCase() === 'virtual' ? 'Virtual' : 'Presencial'
  };
}

const eventoVacio = {
  titulo: '', autor: '', libro: '', fecha: '', horarios: '18:00 HS',
  formato: 'Presencial', lugar: '', categoria: 'Club de Lectura',
  totalEntradas: 30, imagen: '', descripcion: ''
};

export default function SeccionEventos() {
  const { usuario, perfil, esAdmin, cargandoUsuario } = useAuth();
  const [eventos, setEventos] = useState([]);
  const [misReservas, setMisReservas] = useState({});
  const [busqueda, setBusqueda] = useState('');
  const [categoriaSel, setCategoriaSel] = useState('Todas');
  const [formatoSel, setFormatoSel] = useState('Todos');
  const [modalEvento, setModalEvento] = useState(null);
  const [horarioSeleccionado, setHorarioSeleccionado] = useState('');
  const [cantidad, setCantidad] = useState(1);
  const [errorFormulario, setErrorFormulario] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [procesando, setProcesando] = useState(false);
  const [adminAbierto, setAdminAbierto] = useState(false);
  const [formEvento, setFormEvento] = useState(eventoVacio);
  const [eventoEditando, setEventoEditando] = useState(null);

  useEffect(() => {
    const ref = collection(db, EVENTOS_COLLECTION);
    const cancelar = onSnapshot(ref, async (snapshot) => {
      if (snapshot.empty) {
        if (!esAdmin) { setEventos([]); return; }
        // Carga inicial idempotente: los IDs fijos evitan duplicados entre sesiones.
        const existentes = await getDocs(ref);
        if (existentes.empty) {
          await Promise.all(EVENTOS_INICIALES.map((ev) => {
            const normalizado = normalizarEvento(ev);
            return setDoc(doc(db, EVENTOS_COLLECTION, String(ev.id)), {
              ...normalizado,
              stock: normalizado.stock,
              totalEntradas: normalizado.totalEntradas,
              creadoEn: serverTimestamp()
            });
          }));
        }
        return;
      }
      setEventos(snapshot.docs.map(d => normalizarEvento({ ...d.data(), id: d.id })));
    }, (error) => {
      console.error('No se pudieron cargar los eventos:', error);
      setErrorFormulario('No se pudieron cargar los eventos. Revisá las reglas de Firestore.');
    });
    return () => cancelar();
  }, [esAdmin]);

  useEffect(() => {
    if (!usuario) { setMisReservas({}); return; }
    const ref = collection(db, 'perfiles', usuario.uid, 'reservas');
    return onSnapshot(ref, snap => {
      const reservas = {};
      snap.docs.forEach(d => { reservas[d.id] = { id: d.id, ...d.data() }; });
      setMisReservas(reservas);
    }, error => {
      console.error('Error al cargar tus reservas:', error);
      setErrorFormulario('No se pudieron cargar tus reservas. Revisá las reglas de Firestore.');
    });
  }, [usuario]);

  useEffect(() => {
    if (!modalEvento) return;
    const anterior = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const cerrarConEscape = (e) => { if (e.key === 'Escape') cerrarModal(); };
    window.addEventListener('keydown', cerrarConEscape);
    return () => {
      document.body.style.overflow = anterior;
      window.removeEventListener('keydown', cerrarConEscape);
    };
  }, [modalEvento]);

  const eventosFiltrados = useMemo(() => eventos.filter(ev => {
    const q = busqueda.toLowerCase();
    return (!q || `${ev.titulo} ${ev.autor} ${ev.libro}`.toLowerCase().includes(q))
      && (categoriaSel === 'Todas' || ev.categoria === categoriaSel)
      && (formatoSel === 'Todos' || ev.formato === formatoSel);
  }), [eventos, busqueda, categoriaSel, formatoSel]);

  const abrirModal = (evento) => {
    const reserva = misReservas[evento.id];
    setModalEvento(evento);
    setHorarioSeleccionado(reserva?.horario || evento.horarios?.[0] || '');
    setCantidad(reserva?.cantidad || 1);
    setErrorFormulario('');
    setMensaje('');
  };
  const cerrarModal = () => { setModalEvento(null); setErrorFormulario(''); };

  const confirmarReserva = async (e) => {
    e.preventDefault();
    if (!usuario) {
      setErrorFormulario('Para reservar entradas tenés que iniciar sesión o crear una cuenta.');
      return;
    }
    if (!perfil) {
      setErrorFormulario('No se pudo cargar tu perfil. Cerrá sesión y volvé a ingresar.');
      return;
    }
    const qty = Math.max(1, Number(cantidad));
    if (!horarioSeleccionado) { setErrorFormulario('Seleccioná un horario.'); return; }
    setProcesando(true);
    setErrorFormulario('');
    try {
      const eventRef = doc(db, EVENTOS_COLLECTION, modalEvento.id);
      const reservaRef = doc(db, 'perfiles', usuario.uid, 'reservas', modalEvento.id);
      await runTransaction(db, async (tx) => {
        const [eventSnap, reservaSnap] = await Promise.all([tx.get(eventRef), tx.get(reservaRef)]);
        if (!eventSnap.exists()) throw new Error('El evento ya no está disponible.');
        const eventData = eventSnap.data();
        const anterior = reservaSnap.exists() ? Number(reservaSnap.data().cantidad || 0) : 0;
        const delta = qty - anterior;
        const stock = Number(eventData.stock ?? 0);
        if (delta > stock) throw new Error(`Solo quedan ${stock} entradas disponibles.`);
        tx.update(eventRef, { stock: stock - delta });
        tx.set(reservaRef, {
          eventoId: modalEvento.id,
          titulo: eventData.titulo,
          fecha: eventData.fecha,
          lugar: eventData.lugar,
          horario: horarioSeleccionado,
          cantidad: qty,
          usuarioId: usuario.uid,
          email: usuario.email || '',
          actualizadoEn: serverTimestamp(),
          ...(reservaSnap.exists() ? {} : { creadoEn: serverTimestamp() })
        });
      });
      setMensaje('¡Tu reserva quedó confirmada!');
      cerrarModal();
    } catch (error) {
      console.error(error);
      setErrorFormulario(error.message || 'No se pudo confirmar la reserva.');
    } finally { setProcesando(false); }
  };

  const cancelarReserva = async (eventoId) => {
    if (!usuario || !misReservas[eventoId] || procesando) return;
    setProcesando(true);
    setErrorFormulario('');
    try {
      const eventRef = doc(db, EVENTOS_COLLECTION, eventoId);
      const reservaRef = doc(db, 'perfiles', usuario.uid, 'reservas', eventoId);
      await runTransaction(db, async tx => {
        const [eventSnap, reservaSnap] = await Promise.all([tx.get(eventRef), tx.get(reservaRef)]);
        if (!reservaSnap.exists()) return;
        const qty = Number(reservaSnap.data().cantidad || 0);
        if (eventSnap.exists()) tx.update(eventRef, { stock: Number(eventSnap.data().stock || 0) + qty });
        tx.delete(reservaRef);
      });
      cerrarModal();
      setMensaje('Reserva cancelada. Las entradas volvieron al stock.');
    } catch (error) {
      console.error(error);
      setErrorFormulario(error.message || 'No se pudo cancelar la reserva.');
    } finally { setProcesando(false); }
  };

  const guardarEvento = async (e) => {
    e.preventDefault();
    if (!esAdmin) return;
    const id = eventoEditando || `ev-${Date.now()}`;
    const ref = doc(db, EVENTOS_COLLECTION, id);
    const datos = {
      ...formEvento,
      horarios: formEvento.horarios.split(',').map(x => x.trim()).filter(Boolean),
      totalEntradas: Number(formEvento.totalEntradas),
      formato: formEvento.formato,
      actualizadoEn: serverTimestamp()
    };
    try {
      if (eventoEditando) {
        await runTransaction(db, async tx => {
          const snap = await tx.get(ref);
          if (!snap.exists()) throw new Error('El evento no existe.');
          const reservado = Number(snap.data().totalEntradas || 0) - Number(snap.data().stock || 0);
          if (datos.totalEntradas < reservado) throw new Error(`No podés fijar menos de ${reservado} entradas: ya están reservadas.`);
          tx.update(ref, { ...datos, stock: datos.totalEntradas - reservado });
        });
      } else {
        await setDoc(ref, { ...datos, stock: datos.totalEntradas, creadoEn: serverTimestamp() });
      }
      setFormEvento(eventoVacio);
      setEventoEditando(null);
      setMensaje(eventoEditando ? 'Evento actualizado.' : 'Evento creado correctamente.');
    } catch (error) {
      setErrorFormulario(error.message || 'No se pudo guardar el evento.');
    }
  };

  const editarEvento = (ev) => {
    setEventoEditando(ev.id);
    setFormEvento({
      ...eventoVacio, ...ev,
      horarios: (ev.horarios || []).join(', '),
      totalEntradas: ev.totalEntradas
    });
    setAdminAbierto(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const eliminarEvento = async (ev) => {
    if (!esAdmin) return;
    const reservado = ev.totalEntradas - ev.stock;
    if (reservado > 0) {
      setErrorFormulario(`No se puede eliminar "${ev.titulo}" porque tiene ${reservado} entradas reservadas.`);
      return;
    }
    if (!window.confirm(`¿Eliminar el evento "${ev.titulo}"?`)) return;
    try { await deleteDoc(doc(db, EVENTOS_COLLECTION, ev.id)); setMensaje('Evento eliminado.'); }
    catch (error) { setErrorFormulario('No se pudo eliminar el evento.'); }
  };

  return (
    <section className="eventos-section">
      <div className="eventos-container">
        <header className="eventos-header">
          <span className="badge-categoria">RINCÓN DEL LIBRO</span>
          <h1 className="eventos-title">Eventos y encuentros literarios</h1>
          <p className="eventos-subtitle">Compartí lecturas, conocé autores y reservá tu lugar en nuestros próximos encuentros.</p>
        </header>

        {esAdmin && <div className="eventos-admin-bar">
          <div><ShieldCheck size={20}/><strong>Administración de eventos</strong><span>Solo visible para administradores</span></div>
          <button className="btn-primary" onClick={() => { setAdminAbierto(v => !v); setEventoEditando(null); setFormEvento(eventoVacio); }}> <Plus size={16}/> {adminAbierto ? 'Cerrar' : 'Agregar evento'}</button>
        </div>}

        {esAdmin && adminAbierto && <form className="evento-admin-form" onSubmit={guardarEvento}>
          <h3>{eventoEditando ? 'Editar evento' : 'Nuevo evento'}</h3>
          <input placeholder="Título del evento" value={formEvento.titulo} onChange={e=>setFormEvento({...formEvento,titulo:e.target.value})} required/>
          <input placeholder="Autor" value={formEvento.autor} onChange={e=>setFormEvento({...formEvento,autor:e.target.value})} required/>
          <input placeholder="Libro relacionado" value={formEvento.libro} onChange={e=>setFormEvento({...formEvento,libro:e.target.value})} required/>
          <input type="date" value={formEvento.fecha} onChange={e=>setFormEvento({...formEvento,fecha:e.target.value})} required/>
          <input placeholder="Horarios separados por coma" value={formEvento.horarios} onChange={e=>setFormEvento({...formEvento,horarios:e.target.value})} required/>
          <select value={formEvento.formato} onChange={e=>setFormEvento({...formEvento,formato:e.target.value})}><option>Presencial</option><option>Virtual</option></select>
          <input placeholder="Lugar o plataforma" value={formEvento.lugar} onChange={e=>setFormEvento({...formEvento,lugar:e.target.value})} required/>
          <input placeholder="Categoría" value={formEvento.categoria} onChange={e=>setFormEvento({...formEvento,categoria:e.target.value})} required/>
          <input type="number" min="0" value={formEvento.totalEntradas} onChange={e=>setFormEvento({...formEvento,totalEntradas:e.target.value})} placeholder="Stock de entradas" required/>
          <input className="wide" placeholder="URL de imagen (opcional)" value={formEvento.imagen} onChange={e=>setFormEvento({...formEvento,imagen:e.target.value})}/>
          <textarea className="wide" placeholder="Descripción" value={formEvento.descripcion} onChange={e=>setFormEvento({...formEvento,descripcion:e.target.value})} required/>
          <div className="wide evento-admin-actions"><button className="btn-primary" type="submit">{eventoEditando ? 'Guardar cambios' : 'Crear evento'}</button><button className="btn-secondary" type="button" onClick={()=>{setFormEvento(eventoVacio);setEventoEditando(null);}}>Limpiar</button></div>
          {errorFormulario && <p className="evento-error">{errorFormulario}</p>}
        </form>}

        <div className="filtros-bar">
          <div className="input-container"><Search className="input-icon"/><input type="text" placeholder="Buscar por libro, autor o título..." value={busqueda} onChange={e=>setBusqueda(e.target.value)} className="input-busqueda"/></div>
          <div className="eventos-filter-controls">
            <select value={categoriaSel} onChange={e=>setCategoriaSel(e.target.value)} className="select-filtro">
              <option value="Todas">Todas las categorías</option>
              {[...new Set(eventos.map(ev=>ev.categoria))].map(c=><option key={c} value={c}>{c}</option>)}
            </select>
            <select value={formatoSel} onChange={e=>setFormatoSel(e.target.value)} className="select-filtro"><option value="Todos">Todos los formatos</option><option value="Presencial">Presencial</option><option value="Virtual">Virtual</option></select>
          </div>
        </div>

        {eventosFiltrados.length === 0 ? <div className="evento-card evento-empty"><BookOpen/><p>No se encontraron eventos con los filtros seleccionados.</p></div> :
          <div className="eventos-grid">{eventosFiltrados.map(ev => {
            const reserva = misReservas[ev.id];
            const agotado = ev.stock <= 0 && !reserva;
            return <article key={ev.id} className="evento-card">
              <div className="evento-img-wrapper">{ev.imagen && <img src={ev.imagen} alt={`Imagen de ${ev.titulo}`} className="evento-img" loading="lazy"/>}<span className="badge-categoria evento-format-badge">{ev.formato === 'Virtual' ? <Video size={12}/> : <MapPin size={12}/>} {ev.formato}</span></div>
              <div className="evento-content"><div>
                <div className="evento-meta"><span>{ev.categoria}</span><span><Calendar size={13}/> {ev.fecha}</span></div>
                <h3>{ev.titulo}</h3><p className="evento-book">Libro: <strong>{ev.libro}</strong> ({ev.autor})</p>
                <p className="evento-place"><MapPin size={13}/> {ev.lugar}</p>
                {reserva && <div className="evento-reservation-badge"><CheckCircle2 size={13}/> {reserva.cantidad} entrada(s) reservada(s)</div>}
              </div>
              <div className="evento-card-bottom"><span><Users size={14}/> {ev.stock} disponibles</span><div className="evento-actions">
                <button onClick={()=>abrirModal(ev)} className="btn-secondary" aria-label="Ver detalles"><ChevronRight size={18}/></button>
                <button disabled={agotado || cargandoUsuario} onClick={()=>abrirModal(ev)} className={reserva?'btn-reserved':agotado?'btn-disabled':'btn-primary'}>{reserva?<><CheckCircle2 size={14}/> Mi reserva</>:agotado?'Agotado':<><Ticket size={14}/> Reservar</>}</button>
              </div></div>
              </div>
            </article>;
          })}</div>
        }

        {esAdmin && <div className="evento-admin-list"><h3>Gestionar eventos</h3>{eventos.map(ev=><div className="evento-admin-row" key={ev.id}><span><strong>{ev.titulo}</strong><small>{ev.stock} disponibles de {ev.totalEntradas} · {ev.totalEntradas-ev.stock} reservadas</small></span><div><button onClick={()=>editarEvento(ev)}><Pencil size={14}/> Editar</button><button className="danger" onClick={()=>eliminarEvento(ev)}><Trash2 size={14}/> Eliminar</button></div></div>)}</div>}

        {mensaje && <p className="evento-success" role="status">{mensaje}</p>}
        {errorFormulario && !adminAbierto && <p className="evento-error" role="alert">{errorFormulario}</p>}

        {modalEvento && <div className="modal-overlay" onMouseDown={e=>e.target===e.currentTarget && cerrarModal()}>
          <div className="modal-content evento-modal-content" role="dialog" aria-modal="true" aria-labelledby="evento-modal-title">
            <button onClick={cerrarModal} className="btn-secondary modal-close" aria-label="Cerrar"><X size={16}/></button>
            <span className="badge-categoria">{modalEvento.categoria} · {modalEvento.formato}</span>
            <h2 id="evento-modal-title">{modalEvento.titulo}</h2>
            <p className="evento-modal-book">{modalEvento.libro} — {modalEvento.autor}</p>
            <p>{modalEvento.descripcion}</p>
            <p><Calendar size={15}/> {modalEvento.fecha} · {modalEvento.lugar}</p>
            <p><Ticket size={15}/> {modalEvento.stock} entradas disponibles</p>
            <form onSubmit={confirmarReserva} className="evento-reserva-form">
              <label>Horario
                <select value={horarioSeleccionado} onChange={e=>setHorarioSeleccionado(e.target.value)}>{modalEvento.horarios.map(h=><option key={h}>{h}</option>)}</select>
              </label>
              <label>Cantidad de entradas
                <input type="number" min="1" max={Math.max(1,modalEvento.stock + Number(misReservas[modalEvento.id]?.cantidad || 0))} value={cantidad} onChange={e=>setCantidad(e.target.value)} required/>
              </label>
              {!usuario && <p className="evento-login-note">Iniciá sesión para reservar entradas. <a href="/login">Ir a iniciar sesión</a></p>}
              {misReservas[modalEvento.id] && <p className="evento-current-booking">Actualmente tenés {misReservas[modalEvento.id].cantidad} entrada(s). Al confirmar se actualizará esa cantidad.</p>}
              {errorFormulario && <p className="evento-error">{errorFormulario}</p>}
              <div className="evento-modal-actions">
                {misReservas[modalEvento.id] && <button type="button" className="btn-cancel-reserva" disabled={procesando} onClick={()=>cancelarReserva(modalEvento.id)}>Cancelar todas las entradas</button>}
                <button type="submit" className="btn-primary" disabled={procesando || !usuario}>{procesando?'Procesando...':misReservas[modalEvento.id]?'Actualizar reserva':'Confirmar reserva'}</button>
              </div>
            </form>
          </div>
        </div>}
      </div>
    </section>
  );
}
