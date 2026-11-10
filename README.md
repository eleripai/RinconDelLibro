# Rincón del Libro

Aplicación React + Vite con autenticación de Firebase y datos persistidos en Cloud Firestore.

## Puesta en marcha

1. Ejecutá `npm install`.
2. Comprobá que `.env.local` tenga las variables `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_STORAGE_BUCKET`, `VITE_FIREBASE_MESSAGING_SENDER_ID` y `VITE_FIREBASE_APP_ID`.
3. Publicá las reglas del archivo `firestore.rules` en Firebase Console → Firestore Database → Rules.
4. Ejecutá `npm run dev`.

## Configurar el primer administrador

Por seguridad, el registro público siempre crea perfiles con `rol: "usuario"`. Para habilitar el panel de administración:

1. Registrá normalmente la cuenta que será administradora.
2. En Firebase Console → Firestore Database → colección `perfiles`, abrí el documento cuyo ID coincide con el UID de esa cuenta.
3. Cambiá el campo `rol` de `usuario` a `admin`.
4. Cerrá sesión y volvé a iniciar sesión con esa cuenta.

El panel para administrar libros aparece en **Libros** y el de eventos en **Eventos**. Las acciones administrativas están protegidas también por las reglas de Firestore; ocultar botones en la interfaz no es la única protección.

## Reservas y stock de eventos

- Los eventos se guardan en la colección `eventos`.
- Al entrar un administrador por primera vez, si la colección está vacía, se cargan los eventos iniciales del proyecto.
- Las reservas se guardan en `perfiles/{UID}/reservas/{ID_EVENTO}`.
- Cada usuario puede reservar varias entradas para un mismo evento. La cantidad se puede actualizar desde el detalle.
- La confirmación, actualización y cancelación usan transacciones de Firestore: el stock se descuenta o repone en la misma operación que modifica la reserva.
- Un evento no se puede eliminar desde el panel si todavía tiene entradas reservadas.

## Reglas de Firestore

El archivo `firestore.rules` contiene reglas para lectura pública del catálogo y los eventos, administración exclusiva para perfiles con `rol: "admin"` y reservas asociadas al usuario autenticado. Es necesario publicarlas en el proyecto Firebase para que las operaciones funcionen.
