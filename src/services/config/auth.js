import axios from 'axios';

// Cambiar la IP según la red local que utilices
const apiUrl = process.env.EXPO_PUBLIC_API_URL;
const PORT = process.env.EXPO_PUBLIC_PORT;

if (!apiUrl || !PORT) {
    console.error("Error: Las variables de entorno no están definidas correctamente");
  }

console.log("API URL:", apiUrl);
console.log("API PORT:", PORT);
// Configurar Axios para que siempre incluya cookies
axios.defaults.withCredentials = true;

// Funciones para interactuar con el servidor
export const login = async (user) => axios.post(`http://${apiUrl}:${PORT}/api/users/login`, user);
