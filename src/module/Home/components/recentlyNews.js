import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";
import Video from "react-native-video";
import { fetchGameSummary, getSchedule, getPreferences, getLiveGame } from "../../../services/config/auth";
import stylesSummary from "../Styles/stylesSummary";
import { useAuth } from "../../../Context/AuthContext";
import moment from "moment";

const GameSummary = () => {
  const { user } = useAuth();
  const [gameId, setGameId] = useState(null);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [playingAudio, setPlayingAudio] = useState(false);
  const [sound, setSound] = useState(null);

  useEffect(() => {
    const fetchFavoriteGame = async () => {
      try {
        setLoading(true);

        if (!user || !user.id) {
          throw new Error("Usuario no autenticado");
        }

        // Obtener preferencias
        const preferences = await getPreferences(user.id);
        if (!preferences || !Array.isArray(preferences.teams) || preferences.teams.length === 0) {
          console.log("No hay preferencias, no se puede obtener el resumen");
          return;
        }

        // Convertir IDs de equipos favoritos a enteros
        const favoriteTeamIds = preferences.teams.map(teamId => parseInt(teamId, 10));

        // Obtener el calendario de juegos
        const schedule = await getSchedule();
        if (!schedule || !schedule.dates) {
          throw new Error("Error al obtener el calendario");
        }

        const today = moment().format('YYYY-MM-DD');
        const todayGames = schedule.dates.find(d => d.date === today)?.games || [];

        // Filtrar juegos donde participen equipos favoritos
        const favoriteGames = todayGames.filter(game =>
          favoriteTeamIds.includes(game.teams.away.team.id) ||
          favoriteTeamIds.includes(game.teams.home.team.id)
        );

        if (favoriteGames.length === 0) {
          console.log("Ningún equipo favorito está jugando en vivo.");
          setGameId(null);
          return;
        }

        // Verificar si hay un juego en vivo
        const liveGameData = await Promise.all(
          favoriteGames.map(game => getLiveGame(game.gamePk))
        );

        const liveGame = liveGameData.find(game =>
          favoriteTeamIds.includes(game.teams.away.team.id) ||
          favoriteTeamIds.includes(game.teams.home.team.id)
        );

        if (liveGame) {
          console.log(`Juego en vivo encontrado: gamePk = ${liveGame.gamePk}`);
          setGameId(liveGame.gamePk);
        } else {
          setGameId(null);
        }
      } catch (error) {
        console.error("Error al obtener el juego en vivo:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteGame();
  }, [user]);

  useEffect(() => {
    const getSummary = async () => {
      if (!gameId) return;

      try {
        setLoading(true);
        const data = await fetchGameSummary(gameId);
        setSummary(data);
      } catch (error) {
        console.error("Error al obtener el resumen del juego:", error);
      } finally {
        setLoading(false);
      }
    };

    getSummary();
  }, [gameId]);

  const playAudio = async (audioUri) => {
    if (playingAudio) {
      await sound.stopAsync();
      setPlayingAudio(false);
      return;
    }
    try {
      const { sound: newSound } = await Audio.Sound.createAsync({ uri: audioUri });
      setSound(newSound);
      await newSound.playAsync();
      setPlayingAudio(true);
    } catch (error) {
      console.error("Error reproduciendo audio:", error);
    }
  };

  if (loading) return <ActivityIndicator size="large" color="#007AFF" />;
  if (!summary) return <Text>No hay resúmenes disponibles</Text>;

  return (
    <View style={stylesSummary.container}>
      <Text style={stylesSummary.title}>{summary.details.description}</Text>

      <Video source={{ uri: summary.details.videoUri }} style={stylesSummary.video} controls resizeMode="contain" />

      {summary.details.audioUris.map((audio, index) => (
        <TouchableOpacity key={index} style={stylesSummary.audioButton} onPress={() => playAudio(audio.uri)}>
          <Text style={stylesSummary.audioText}>🎧 Escuchar en {audio.languageCode}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default GameSummary;
