
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc
} from "firebase/firestore";

import { auth, db } from "./firebase.js";
import { LIBROS_INICIALES } from "./datos/libros.js";

const formulario = document.getElementById("formImportacion");
const boton = document.getElementById("botonImportar");
const resultado = document.getElementById("resultado");

formulario.addEventListener("submit", async (event) => {
  event.preventDefault();

  boton.disabled = true;
  resultado.textContent = "Verificando cuenta e importando libros...";

  let inicioSesionCorrecto = false;

  try {
    const correo = document.getElementById("correo").value.trim();
    const contrasena = document.getElementById("contrasena").value;

    const credencial = await signInWithEmailAndPassword(
      auth,
      correo,
      contrasena
    );

    inicioSesionCorrecto = true;

    const perfilRef = doc(db, "perfiles", credencial.user.uid);
    const perfilSnap = await getDoc(perfilRef);

    if (!perfilSnap.exists() || perfilSnap.data().rol !== "admin") {
      throw new Error("La cuenta no tiene permisos de administrador.");
    }

    let importados = 0;
    let existentes = 0;

    for (const libro of LIBROS_INICIALES) {
      const libroRef = doc(db, "libros", String(libro.id));
      const libroSnap = await getDoc(libroRef);

      // No sobrescribir documentos que ya existen.
      if (libroSnap.exists()) {
        existentes++;
        continue;
      }

      await setDoc(libroRef, {
        ...libro,
        stock: 0
      });

      importados++;
    }

    resultado.textContent =
      `Importación terminada. Nuevos: ${importados}. ` +
      `Ya existentes y conservados: ${existentes}.`;

  } catch (error) {
    console.error(error);
    resultado.textContent =
      "No se pudo completar la importación. Revisá la consola y los permisos.";
  } finally {
    if (inicioSesionCorrecto) {
      try {
        await signOut(auth);
      } catch (error) {
        console.error("No se pudo cerrar la sesión:", error);
      }
    }

    boton.disabled = false;
  }
});
