// Funciones auxiliares para el formulario de Registro

/**
 * Valida la estructura básica de un correo electrónico.
 * @param {string} email 
 * @returns {boolean}
 */
export const validarEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/**
 * Valida que la contraseña cumpla con una longitud mínima.
 * @param {string} password 
 * @param {number} minLength 
 * @returns {boolean}
 */
export const validarPassword = (password, minLength = 6) => {
  return password.length >= minLength;
};

/**
 * Manejador de registro social (Google, Facebook, Instagram)
 * @param {string} proveedor 
 */
export const autenticarRedSocial = (proveedor) => {
  console.log(`Iniciando autenticación con ${proveedor}...`);
  // Aquí puedes integrar la API de Firebase, OAuth o tu backend
};