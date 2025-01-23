import axios from "axios";
import { setWithExpiration } from "../config/redis"; // Importar la función de Redis
import { firestore } from "../config/database";

const mlbApi = axios.create({
  baseURL: process.env.MLB_STATS_BASEURL || "https://statsapi.mlb.com",
});

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 segundo

async function fetchWithRetry(
  url: string,
  retries = MAX_RETRIES
): Promise<any> {
  try {
    return await mlbApi.get(url);
  } catch (error) {
    if (retries > 0) {
      await new Promise((res) =>
        setTimeout(res, RETRY_DELAY * 2 ** (MAX_RETRIES - retries))
      );
      return fetchWithRetry(url, retries - 1);
    }
    throw error;
  }
}

async function getCachedData(
  cacheKey: string,
  fetchFunction: () => Promise<any>
): Promise<any> {
  // const cachedData = await redis.get(cacheKey); // Eliminar acceso directo a Redis
  // if (cachedData) {
  //   return JSON.parse(cachedData);
  // }

  // Simular la verificación de cache (deshabilitado)
  // return null;

  // Implementar según se reactive Redis
  return null;
}

export async function getSeasonSchedule() {
  const cacheKey = "seasonSchedule:2024";
  const cachedData = await getCachedData(cacheKey, () =>
    fetchWithRetry("/api/v1/schedule?sportId=1&season=2024&gameType=R")
  );
  if (cachedData) {
    return cachedData;
  }

  try {
    const { data } = await fetchWithRetry(
      "/api/v1/schedule?sportId=1&season=2024&gameType=R"
    );
    await setWithExpiration(cacheKey, JSON.stringify(data)); // Usar función de Redis
    return data;
  } catch (error) {
    // Fallback a Firestore
    const doc = await firestore.collection("seasonSchedules").doc("2024").get();
    if (doc.exists) {
      return doc.data();
    }
    throw new Error("Error obteniendo el calendario desde la API y Firestore.");
  }
}

export async function getGameLive(gamePk: string) {
  const cacheKey = `gameLive:${gamePk}`;
  const cachedData = await getCachedData(cacheKey, () =>
    fetchWithRetry(`/api/v1.1/game/${gamePk}/feed/live`)
  );
  if (cachedData) {
    return cachedData;
  }

  try {
    const { data } = await fetchWithRetry(`/api/v1.1/game/${gamePk}/feed/live`);
    await setWithExpiration(cacheKey, JSON.stringify(data));
    return data;
  } catch (error) {
    // Fallback a Firestore
    const doc = await firestore.collection("gameLives").doc(gamePk).get();
    if (doc.exists) {
      return doc.data();
    }
    throw new Error(
      "Error obteniendo el estado del juego desde la API y Firestore."
    );
  }
}

export async function getGameLiveByTimecode(gamePk: string, timecode: string) {
  const cacheKey = `gameLiveByTimecode:${gamePk}:${timecode}`;
  const cachedData = await getCachedData(cacheKey, () =>
    fetchWithRetry(`/api/v1.1/game/${gamePk}/feed/live?timecode=${timecode}`)
  );
  if (cachedData) {
    return cachedData;
  }

  try {
    const { data } = await fetchWithRetry(
      `/api/v1.1/game/${gamePk}/feed/live?timecode=${timecode}`
    );
    await setWithExpiration(cacheKey, JSON.stringify(data));
    return data;
  } catch (error) {
    // Fallback a Firestore
    const doc = await firestore
      .collection("gameLiveByTimecodes")
      .doc(`${gamePk}:${timecode}`)
      .get();
    if (doc.exists) {
      return doc.data();
    }
    throw new Error(
      "Error obteniendo el estado del juego por timecode desde la API y Firestore."
    );
  }
}

export async function getGameTimestamps(gamePk: string) {
  const cacheKey = `gameTimestamps:${gamePk}`;
  const cachedData = await getCachedData(cacheKey, () =>
    fetchWithRetry(`/api/v1.1/game/${gamePk}/feed/live/timestamps`)
  );
  if (cachedData) {
    return cachedData;
  }

  try {
    const { data } = await fetchWithRetry(
      `/api/v1.1/game/${gamePk}/feed/live/timestamps`
    );
    await setWithExpiration(cacheKey, JSON.stringify(data));
    return data;
  } catch (error) {
    // Fallback a Firestore
    const doc = await firestore.collection("gameTimestamps").doc(gamePk).get();
    if (doc.exists) {
      return doc.data();
    }
    throw new Error(
      "Error obteniendo los timestamps del juego desde la API y Firestore."
    );
  }
}

export async function getPlayerInfo(playerId: string) {
  const cacheKey = `playerInfo:${playerId}`;
  const cachedData = await getCachedData(cacheKey, () =>
    fetchWithRetry(`/api/v1/people/${playerId}`)
  );
  if (cachedData) {
    return cachedData;
  }

  try {
    const { data } = await fetchWithRetry(`/api/v1/people/${playerId}`);
    await setWithExpiration(cacheKey, JSON.stringify(data));
    return data;
  } catch (error) {
    // Fallback a Firestore
    const doc = await firestore.collection("playerInfos").doc(playerId).get();
    if (doc.exists) {
      return doc.data();
    }
    throw new Error(
      "Error obteniendo la información del jugador desde la API y Firestore."
    );
  }
}

export async function getTeamRoster(teamId: string) {
  const cacheKey = `teamRoster:${teamId}`;
  const cachedData = await getCachedData(cacheKey, () =>
    fetchWithRetry(`/api/v1/teams/${teamId}/roster?season=2024`)
  );
  if (cachedData) {
    return cachedData;
  }

  try {
    const { data } = await fetchWithRetry(
      `/api/v1/teams/${teamId}/roster?season=2024`
    );
    await setWithExpiration(cacheKey, JSON.stringify(data));
    return data;
  } catch (error) {
    // Fallback a Firestore
    const doc = await firestore.collection("teamRosters").doc(teamId).get();
    if (doc.exists) {
      return doc.data();
    }
    throw new Error(
      "Error obteniendo la plantilla del equipo desde la API y Firestore."
    );
  }
}
