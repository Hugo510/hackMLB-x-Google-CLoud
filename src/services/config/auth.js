import apiClient from "./apiClient";

// Funciones para interactuar con el servidor
// Guardar datos del Login
export const login = async (user) => {
  try {
    const response = await apiClient.post(`/api/users/login`, user, {
      headers: { "Content-Type": "application/json" },
    });
    if (!response.data || !response.data.token) {
      throw new Error("El backend no devolvió un token válido");
    }
    return response.data;
  } catch (error) {
    console.error("Error en login:");
    throw error; 
  }
};
// CREAR UN NUEVO USUARIO
export const signup = async (user) => {
  try {
    const response = await apiClient.post(`/api/users/signup`, user, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
      return response.data;
    } catch (error) {
      console.error("Error en login:");
      throw error; 
    }
};

// LLAMAR A LOS EQUIPOS EN LA BD (IDS Y NOMBRES)
export const getTeams = async(setTeams, setLoading)=>{
  try {
    const response = await apiClient.get(`/api/teams`);
    setTeams(response.data);
    setLoading(false);
  } catch (error) {
    console.error('Error al obtener los equipos:');
    setLoading(false);
  }
}

// Guardar Preferencias del usuario
export const updatePreferences = async (preferences) => {
  try {
    const response = await apiClient.post(
      `/api/users/preferences`, preferences, { 
      headers: { "Content-Type": "application/json" } 
    });
    
    return response.data;
  } catch (error) {
    console.error("Error al actualizar preferencias:");
    throw error;
  }
};
// Obtener las preferencias del usuario
export const getPreferences = async (userId) => {
  try {
    
    const response = await apiClient.get(`/api/users/preferences/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener preferencias:");
    return { teams: [], players: [] }; 
  }
};

// Obtener Datos de la Temporada
export const getSchedule = async () => {
  try {
    const response = await apiClient.get(`/api/mlb-stats/schedule`);
    return response.data;
  } catch (error) {
    console.error("Error trayendo stats:");
    throw error;
  }
};

// Obtener juegos en vivo de la MLB
export const getLiveGames = async (gamePk) => {
  try {
    const response = await apiClient.get(`/api/mlb-stats/live/${gamePk}`);
    const liveGames = response.data.dates
      .flatMap(date => date.games)
      .filter(game => game.status.abstractGameState === "Live");

    return liveGames;
  } catch (error) {
    console.error("Error fetching live games:",);
    return [];
  }
};
// SIMULADO
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
    console.error("Error fetching favorite live games:");
    return [];
  }
};

// Acceder a los resumenes: import apiClient from "./apiClient";

export const fetchGameSummary = async (gameId) => {
  try {
    const response = await apiClient.get(`/game-summary/${gameId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching summary:");
    return null;
  }
};
