export const appSettings = {
  port: parseInt(process.env.PORT || "8080", 10),
  baseUrl: process.env.MLB_STATS_BASEURL || "https://statsapi.mlb.com",
  // ...agregar más ajustes de la aplicación...
};
