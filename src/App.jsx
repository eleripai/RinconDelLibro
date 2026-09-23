import React from 'react';
import Principal from './paginas/principal.jsx';
import './App.css';
import Eventos from './paginas/eventos.jsx';
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
      <Routes>
        <Route path="/" element={<Principal />} />
        <Route path="/eventos" element={<Eventos />} />
      </Routes>
  );
}

