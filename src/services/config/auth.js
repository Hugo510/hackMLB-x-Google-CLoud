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
// CREAR UN NUEVO USUARIO
export const signup = async (user) => {
  try {
    const response = await axios.post(`http://${apiUrl}:${PORT}/api/users/signup`, user, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
      return response.data;
    } catch (error) {
      console.error("Error en login:", error.response?.data || error.message);
      throw error; 
    }
};

// LLAMAR A LOS EQUIPOS EN LA BD (IDS Y NOMBRES)
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

// Guardar Preferencias del usuario
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
// Obtener las preferencias del usuario
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

// Obtener Datos de la Temporada
export const getSchedule = async () => {
  try {
    const response = await axios.get(`http://${apiUrl}:${PORT}/api/mlb-stats/schedule`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("Error trayendo stats:", error);
    throw error;
  }
};

// Obtener juegos en vivo de la MLB
export const getLiveGame = async (gamePk) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        gamePk: gamePk,
        teams: {
          away: { team: { id: 108, name: "Yankees" } },
          home: { team: { id: 147, name: "Red Sox" } }
        },
        status: { detailedState: "Final" }
      });
    }, 1000);
  });
};


// Filtrar Juegos en vivo de equipos favoritos
export const getFavoriteLiveGames = async (userId) => {
  try {
    const teamIds = await getPreferences(userId);
    const liveGames = await getLiveGames();

    return liveGames.filter(game =>
      teamIds.includes(game.teams.home.team.id) || teamIds.includes(game.teams.away.team.id)
    );
  } catch (error) {
    console.error("Error fetching favorite live games:", error);
    return [];
  }
};