import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Spinner from './Spinner.jsx';

function CargaDeRuta({ children }) {
  const location = useLocation();

  // Tomamos solo la sección de la URL  así el spinner
  // no aparece al abrir o cerrar el modal de un libro (
  const seccion = location.pathname.split('/')[1];

  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Cada vez que cambia la sección, mostramos el spinner medio segundo
    setCargando(true);
    const timer = setTimeout(() => setCargando(false), 500);
    return () => clearTimeout(timer);
  }, [seccion]);

  return (
    <>
      {cargando && (
        <div className="carga-overlay">
          <Spinner />
        </div>
      )}
      {children}
    </>
  );
}

export default CargaDeRuta;