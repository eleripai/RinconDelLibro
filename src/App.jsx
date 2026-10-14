import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Principal from './paginas/principal.jsx';
import Registro from './paginas/Registro.jsx';
import InicioSesion from './paginas/InicioSesion.jsx';
import Eventos from './paginas/eventos.jsx';
import Nosotros from './paginas/sobreNosotros.jsx';
import Libros from './paginas/libros.jsx';
import SiteLayout from './componentes/SiteLayout.jsx';

function PublicLayout({ children }) { return <SiteLayout>{children}</SiteLayout>; }

export default function App() {
  return <Routes>
    <Route path="/" element={<PublicLayout><Principal /></PublicLayout>} />
    <Route path="/eventos" element={<PublicLayout><Eventos /></PublicLayout>} />
    <Route path="/nosotros" element={<PublicLayout><Nosotros /></PublicLayout>} />
    <Route path="/libros" element={<PublicLayout><Libros /></PublicLayout>} />
    <Route path="/Libros" element={<PublicLayout><Libros /></PublicLayout>} />
    <Route path="/registro" element={<Registro />} />
    <Route path="/login" element={<InicioSesion />} />
  </Routes>;
}
