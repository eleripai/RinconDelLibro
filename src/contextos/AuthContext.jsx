
import React, {
  createContext,
  useContext,
  useEffect,
  useState
} from 'react';

import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase.js';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [perfil, setPerfil] = useState(null);
  const [cargandoUsuario, setCargandoUsuario] = useState(true);

  useEffect(() => {
    const cancelarEscucha = onAuthStateChanged(auth, async (usuarioFirebase) => {
      setCargandoUsuario(true);

      if (!usuarioFirebase) {
        setUsuario(null);
        setPerfil(null);
        setCargandoUsuario(false);
        return;
      }

      try {
        const perfilRef = doc(db, 'perfiles', usuarioFirebase.uid);
        const perfilSnap = await getDoc(perfilRef);

        setUsuario(usuarioFirebase);
        setPerfil(perfilSnap.exists() ? perfilSnap.data() : null);
      } catch (error) {
        console.error('Error al obtener el perfil:', error);
        setUsuario(usuarioFirebase);
        setPerfil(null);
      } finally {
        setCargandoUsuario(false);
      }
    });

    return () => cancelarEscucha();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        usuario,
        perfil,
        esAdmin: perfil?.rol === 'admin',
        cargandoUsuario
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
