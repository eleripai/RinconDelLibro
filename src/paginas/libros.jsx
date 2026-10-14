import React, { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { LIBROS_INICIALES } from '../datos/libros.js';
import '../css/libros.css';

const DB_KEY = 'rincon-del-libro-db-v2';
const FAVORITOS_KEY = 'rincon-del-libro-favoritos';
const LECTURA_KEY = 'rincon-del-libro-lectura';
const CATEGORIAS_BASE = ['Todas', 'Novela', 'Fantasía', 'Ciencia ficción', 'Romance', 'Clásicos', 'Misterio', 'Realismo mágico', 'Terror', 'Aventura'];

const readStorage = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch { return fallback; }
};

function formatYear(year) { return year < 0 ? `${Math.abs(year)} a.C.` : year; }

function BookCover({ libro, className = '' }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`book-cover ${className}`}>
      {!failed && libro.imagen ? <img src={libro.imagen} alt={`Portada de ${libro.titulo}`} onError={() => setFailed(true)} /> : (
        <div className="fallback-cover"><span>RINCÓN<br />DEL LIBRO</span><strong>{libro.titulo}</strong><small>{libro.autor}</small></div>
      )}
    </div>
  );
}

function BookModal({ libro, favorito, enLectura, onClose, onFavorite, onReading }) {
  useEffect(() => {
    const close = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', close);
    document.body.classList.add('modal-open');
    return () => { document.removeEventListener('keydown', close); document.body.classList.remove('modal-open'); };
  }, [onClose]);

  return (
    <div className="modal-fondo" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <article className="book-modal">
        <button className="modal-cerrar" onClick={onClose} aria-label="Cerrar">×</button>
        <BookCover libro={libro} className="modal-cover" />
        <div className="modal-info">
          <span className="book-category">{libro.categoria}</span>
          <h2>{libro.titulo}</h2>
          <h4>{libro.autor}</h4>
          <div className="modal-rating">★★★★★ <b>{libro.rating}</b></div>
          <p>{libro.descripcion}</p>
          <div className="modal-facts"><span>📅 {formatYear(libro.año)}</span><span>📖 {libro.paginas} páginas</span><span>{libro.disponible ? '🟢 Disponible' : '🔴 Prestado'}</span></div>
          <div className="modal-actions">
            <button className={`action-btn ${favorito ? 'selected' : ''}`} onClick={onFavorite}>{favorito ? '♥ En favoritos' : '♡ Agregar a favoritos'}</button>
            <button className={`action-btn ${enLectura ? 'selected' : ''}`} onClick={onReading}>{enLectura ? '✓ En mi lectura' : '+ Mi lista de lectura'}</button>
          </div>
        </div>
      </article>
    </div>
  );
}

function AdminPanel({ libros, onSave, onDelete, onClose }) {
  const empty = { titulo: '', autor: '', categoria: 'Novela', año: new Date().getFullYear(), paginas: 200, disponible: true, destacado: false, rating: 4.5, imagen: '', descripcion: '' };
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const edit = (libro) => { setForm(libro); setEditingId(libro.id); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const change = (key, value) => setForm((old) => ({ ...old, [key]: value }));
  const submit = (e) => {
    e.preventDefault();
    if (!form.titulo.trim() || !form.autor.trim()) return;
    onSave({ ...form, id: editingId || Date.now(), año: Number(form.año), paginas: Number(form.paginas), rating: Number(form.rating) });
    setForm(empty); setEditingId(null);
  };

  return (
    <section className="admin-panel" id="admin">
      <div className="admin-title"><div><span>ADMINISTRACIÓN</span><h2>{editingId ? 'Editar libro' : 'Agregar libro'}</h2><p>Los cambios se guardan automáticamente en la base de datos local del navegador.</p></div><button onClick={onClose} className="admin-close">Cerrar ×</button></div>
      <form className="book-form" onSubmit={submit}>
        <input placeholder="Título" value={form.titulo} onChange={(e) => change('titulo', e.target.value)} required />
        <input placeholder="Autor" value={form.autor} onChange={(e) => change('autor', e.target.value)} required />
        <select value={form.categoria} onChange={(e) => change('categoria', e.target.value)}>{CATEGORIAS_BASE.slice(1).map(c => <option key={c}>{c}</option>)}</select>
        <input type="number" placeholder="Año" value={form.año} onChange={(e) => change('año', e.target.value)} />
        <input type="number" placeholder="Páginas" value={form.paginas} onChange={(e) => change('paginas', e.target.value)} />
        <input type="number" min="0" max="5" step="0.1" placeholder="Rating" value={form.rating} onChange={(e) => change('rating', e.target.value)} />
        <input className="wide" placeholder="URL de portada (opcional)" value={form.imagen} onChange={(e) => change('imagen', e.target.value)} />
        <textarea className="wide" placeholder="Descripción" value={form.descripcion} onChange={(e) => change('descripcion', e.target.value)} />
        <label><input type="checkbox" checked={form.disponible} onChange={(e) => change('disponible', e.target.checked)} /> Disponible</label>
        <label><input type="checkbox" checked={form.destacado} onChange={(e) => change('destacado', e.target.checked)} /> Destacado</label>
        <div className="form-actions wide"><button className="primary-btn" type="submit">{editingId ? 'Guardar cambios' : 'Agregar a biblioteca'} →</button>{editingId && <button type="button" className="secondary-btn" onClick={() => { setForm(empty); setEditingId(null); }}>Cancelar</button>}</div>
      </form>
      <div className="admin-list"><div className="admin-list-head"><strong>Libros registrados</strong><span>{libros.length} en la base de datos</span></div>{libros.map(libro => <div className="admin-row" key={libro.id}><span><b>{libro.titulo}</b><small>{libro.autor} · {libro.categoria}</small></span><div><button onClick={() => edit(libro)}>Editar</button><button className="danger" onClick={() => setConfirmDelete(libro.id)}>Eliminar</button></div></div>)}</div>
      {confirmDelete && <div className="confirm-box"><p>¿Eliminar este libro de la base de datos?</p><button className="danger solid" onClick={() => { onDelete(confirmDelete); setConfirmDelete(null); }}>Sí, eliminar</button><button onClick={() => setConfirmDelete(null)}>Cancelar</button></div>}
    </section>
  );
}

export default function Libros() {
  const [searchParams] = useSearchParams();
  const [libros, setLibros] = useState(() => readStorage(DB_KEY, LIBROS_INICIALES));
  const [busqueda, setBusqueda] = useState(() => searchParams.get('buscar') || '');
  const [categoria, setCategoria] = useState(() => searchParams.get('categoria') || 'Todas');
  const [orden, setOrden] = useState('relevancia');
  const [soloDisponibles, setSoloDisponibles] = useState(false);
  const [soloFavoritos, setSoloFavoritos] = useState(false);
  const [vista, setVista] = useState('grid');
  const [seleccionado, setSeleccionado] = useState(null);
  const [favoritos, setFavoritos] = useState(() => readStorage(FAVORITOS_KEY, []));
  const [lectura, setLectura] = useState(() => readStorage(LECTURA_KEY, []));
  const [adminOpen, setAdminOpen] = useState(false);
  const [toast, setToast] = useState('');
  const [showTop, setShowTop] = useState(false);

  useEffect(() => localStorage.setItem(DB_KEY, JSON.stringify(libros)), [libros]);
  useEffect(() => localStorage.setItem(FAVORITOS_KEY, JSON.stringify(favoritos)), [favoritos]);
  useEffect(() => localStorage.setItem(LECTURA_KEY, JSON.stringify(lectura)), [lectura]);
  useEffect(() => { const onScroll = () => setShowTop(window.scrollY > 500); window.addEventListener('scroll', onScroll); return () => window.removeEventListener('scroll', onScroll); }, []);
  useEffect(() => { if (!toast) return; const timer = setTimeout(() => setToast(''), 2200); return () => clearTimeout(timer); }, [toast]);

  const categorias = useMemo(() => ['Todas', ...new Set(libros.map(l => l.categoria))], [libros]);
  const filtrados = useMemo(() => libros.filter(l => {
    const q = busqueda.trim().toLowerCase();
    return (!q || `${l.titulo} ${l.autor} ${l.categoria}`.toLowerCase().includes(q)) && (categoria === 'Todas' || l.categoria === categoria) && (!soloDisponibles || l.disponible) && (!soloFavoritos || favoritos.includes(l.id));
  }).sort((a, b) => {
    if (orden === 'titulo') return a.titulo.localeCompare(b.titulo);
    if (orden === 'autor') return a.autor.localeCompare(b.autor);
    if (orden === 'nuevo') return b.año - a.año;
    if (orden === 'paginas') return b.paginas - a.paginas;
    return Number(b.destacado) - Number(a.destacado) || b.rating - a.rating;
  }), [libros, busqueda, categoria, soloDisponibles, soloFavoritos, favoritos, orden]);

  const stats = { total: libros.length, disponibles: libros.filter(l => l.disponible).length, categorias: new Set(libros.map(l => l.categoria)).size, favoritos: favoritos.length };
  const toggleFavorite = (id) => setFavoritos(old => old.includes(id) ? old.filter(x => x !== id) : [...old, id]);
  const toggleReading = (id) => setLectura(old => old.includes(id) ? old.filter(x => x !== id) : [...old, id]);
  const reset = () => { setBusqueda(''); setCategoria('Todas'); setSoloDisponibles(false); setSoloFavoritos(false); setOrden('relevancia'); };
  const saveBook = (book) => { setLibros(old => old.some(x => x.id === book.id) ? old.map(x => x.id === book.id ? book : x) : [book, ...old]); setToast('✓ Biblioteca actualizada'); };
  const deleteBook = (id) => { setLibros(old => old.filter(x => x.id !== id)); setFavoritos(old => old.filter(x => x !== id)); setLectura(old => old.filter(x => x !== id)); setToast('Libro eliminado'); };

  return (
    <div className="biblioteca-page">
<main>
        <section className="library-hero">
          <div className="hero-copy"><span className="library-eyebrow">NUESTRA COLECCIÓN · {stats.total} LIBROS</span><h1>Una biblioteca<br /><em>llena de historias.</em></h1><p>Explorá, filtrá y descubrí tu próxima lectura. Guardá favoritos y armá tu propia lista.</p><div className="hero-mini-stats"><span><b>{stats.disponibles}</b> disponibles</span><span><b>{stats.categorias}</b> categorías</span><span><b>{stats.favoritos}</b> favoritos</span></div></div><div className="hero-stack"><div className="stack-card one">✦</div><div className="stack-card two">LIBROS</div><div className="stack-card three">RDL</div></div>
        </section>

        {adminOpen && <AdminPanel libros={libros} onSave={saveBook} onDelete={deleteBook} onClose={() => setAdminOpen(false)} />}

        <section id="coleccion" className="library-content">
          <div className="search-box"><span>⌕</span><input value={busqueda} onChange={e => setBusqueda(e.target.value)} placeholder="Buscar por título, autor o categoría..." />{busqueda && <button onClick={() => setBusqueda('')}>×</button>}<kbd>Ctrl K</kbd></div>
          <div className="filter-toolbar"><div className="quick-categories" id="categorias">{categorias.map(cat => <button key={cat} className={categoria === cat ? 'quick active' : 'quick'} onClick={() => setCategoria(cat)}>{cat}</button>)}</div><div className="filters"><select value={orden} onChange={e => setOrden(e.target.value)}><option value="relevancia">Más recomendados</option><option value="titulo">Título A-Z</option><option value="autor">Autor A-Z</option><option value="nuevo">Más recientes</option><option value="paginas">Más páginas</option></select><label><input type="checkbox" checked={soloDisponibles} onChange={e => setSoloDisponibles(e.target.checked)} /> Disponibles</label><button className="view-btn" onClick={() => setVista(v => v === 'grid' ? 'list' : 'grid')} title="Cambiar vista">{vista === 'grid' ? '☷' : '▦'}</button></div></div>

          <div className="results-head"><div><span className="eyebrow-dark">CATÁLOGO</span><h2>{categoria === 'Todas' ? 'Todos los libros' : categoria}</h2></div><span>{filtrados.length} {filtrados.length === 1 ? 'resultado' : 'resultados'}</span></div>

          {filtrados.length ? <div className={`libros-grid ${vista === 'list' ? 'list-view' : ''}`}>{filtrados.map((libro, index) => <article className="libro-card" key={libro.id} style={{ '--delay': `${Math.min(index, 8) * 45}ms` }}>
            <div className="card-cover-wrap"><BookCover libro={libro} /><span className={`availability ${libro.disponible ? 'available' : ''}`}>{libro.disponible ? 'Disponible' : 'Prestado'}</span>{libro.destacado && <span className="featured">✦ Destacado</span>}<button className={`favorite ${favoritos.includes(libro.id) ? 'liked' : ''}`} onClick={() => toggleFavorite(libro.id)} aria-label="Favorito">{favoritos.includes(libro.id) ? '♥' : '♡'}</button></div>
            <div className="card-info"><span className="card-category">{libro.categoria}</span><h3>{libro.titulo}</h3><p className="author">{libro.autor}</p><div className="card-meta"><span>★ {libro.rating}</span><span>📖 {libro.paginas} pág.</span><span>{formatYear(libro.año)}</span></div><button className="detail-btn" onClick={() => setSeleccionado(libro)}>Ver detalles <span>→</span></button></div>
          </article>)}</div> : <div className="empty-state"><div>⌕</div><h3>No encontramos libros</h3><p>Probá con otro término o limpiá los filtros.</p><button className="primary-btn" onClick={reset}>Restablecer filtros</button></div>}
        </section>

        <section id="estadisticas" className="stats-section"><div><span>LA BIBLIOTECA EN NÚMEROS</span><h2>Hay una historia esperando por vos.</h2></div><div className="stats-grid"><div><strong>{stats.total}</strong><span>Libros</span></div><div><strong>{stats.disponibles}</strong><span>Disponibles</span></div><div><strong>{stats.categorias}</strong><span>Categorías</span></div><div><strong>{stats.favoritos}</strong><span>Favoritos</span></div></div></section>
      </main>
{showTop && <button className="floating-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>↑</button>}
      {seleccionado && <BookModal libro={seleccionado} favorito={favoritos.includes(seleccionado.id)} enLectura={lectura.includes(seleccionado.id)} onClose={() => setSeleccionado(null)} onFavorite={() => { toggleFavorite(seleccionado.id); setToast(favoritos.includes(seleccionado.id) ? 'Quitado de favoritos' : '♥ Agregado a favoritos'); }} onReading={() => { toggleReading(seleccionado.id); setToast(lectura.includes(seleccionado.id) ? 'Quitado de tu lista' : '✓ Agregado a tu lista de lectura'); }} />}
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
