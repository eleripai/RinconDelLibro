//circulo de carga de boostrap 
import React from 'react';

export default function Cargando() {
  return (
    <div className="d-flex justify-content-center my-5">
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Cargando...</span>
      </div>
    </div>
  );
}