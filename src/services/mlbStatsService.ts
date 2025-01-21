import axios from "axios";

const mlbApi = axios.create({
  baseURL: process.env.MLB_STATS_BASEURL || "https://statsapi.mlb.com",
});

export async function getSeasonSchedule() {
  const { data } = await mlbApi.get(
    "/api/v1/schedule?sportId=1&season=2024&gameType=R"
  );
  return data;
}

export async function getGameLive(gamePk: string) {
  const { data } = await mlbApi.get(`/api/v1.1/game/${gamePk}/feed/live`);
  return data;
}

export async function getGameLiveByTimecode(gamePk: string, timecode: string) {
  const { data } = await mlbApi.get(
    `/api/v1.1/game/${gamePk}/feed/live?timecode=${timecode}`
  );
  return data;
}

export async function getGameTimestamps(gamePk: string) {
  const { data } = await mlbApi.get(
    `/api/v1.1/game/${gamePk}/feed/live/timestamps`
  );
  return data;
}

export async function getPlayerInfo(playerId: string) {
  const { data } = await mlbApi.get(`/api/v1/people/${playerId}`);
  return data;
}

export async function getTeamRoster(teamId: string) {
  const { data } = await mlbApi.get(
    `/api/v1/teams/${teamId}/roster?season=2024`
  );
  return data;
}

// ...crear más funciones (timecode, timestamps, people, roster)...
