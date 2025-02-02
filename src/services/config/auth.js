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
// Guardar datos del Login
export const login = async (user) => {
  try {
    const response = await axios.post(`http://${apiUrl}:${PORT}/api/users/login`, user, {
      headers: { "Content-Type": "application/json" },
    });
    if (!response.data || !response.data.token) {
      throw new Error("El backend no devolvió un token válido");
    }
    return response.data;
  } catch (error) {
    console.error("Error en login:", error.response?.data || error.message);
    throw error; 
  }
};
export const signup = async (user) => axios.post(`http://${apiUrl}:${PORT}/api/users/signup`, user);

export const getTeams = async(setTeams, setLoading)=>{
  try {
    const response = await axios.get(`http://${apiUrl}:${PORT}/api/teams`);
    setTeams(response.data);
    setLoading(false);
  } catch (error) {
    console.error('Error al obtener los equipos:', error);
    setLoading(false);
  }
}

export const updatePreferences = async (preferences) => {
  try {
    const response = await axios.post(
      `http://${apiUrl}:${PORT}/api/users/preferences`, preferences, { 
      headers: { "Content-Type": "application/json" } 
    });
    
    return response.data;
  } catch (error) {
    console.error("Error al actualizar preferencias:", error);
    throw error;
  }
};

export const getPreferences = async (userId) => {
  try {
    const response = await axios.get(`http://${apiUrl}:${PORT}/api/users/preferences/${userId}`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("Error al obtener preferencias:", error);
    return { teams: [], players: [] }; 
  }
};