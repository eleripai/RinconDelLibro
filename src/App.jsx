import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Principal from './paginas/principal.jsx';
import Registro from './paginas/Registro.jsx';
import InicioSesion from './paginas/InicioSesion.jsx'; 

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Principal />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/login" element={<InicioSesion />} /> 
    </Routes>
  );
}