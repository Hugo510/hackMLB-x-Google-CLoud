import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { getSchedule, getPreferences, getTeams, getLiveGame } from '../../../services/config/auth';
import stylesFavorites from '../Styles/stylesFavorites';
import moment from 'moment';
import { useAuth } from '../../../Context/AuthContext';

const FavoriteLiveGames = () => {
  const { user } = useAuth();
  const [liveGames, setLiveGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLiveGames = async () => {
      try {
        setLoading(true);
  
        if (!user || !user.id) {
          throw new Error("Usuario no autenticado");
        }
  
        // Obtener preferencias
        const preferences = await getPreferences(user.id);
        if (!preferences || !Array.isArray(preferences.teams)) {
          throw new Error("No se pudieron obtener las preferencias");
        }
  
        // Convertir los IDs de los equipos
        const favoriteTeamIds = preferences.teams.map(teamId => parseInt(teamId, 10));
  
        // Obtener juegos del día actual
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
          setLiveGames([]);
          return;
        }
  
        // Obtener datos en vivo de los juegos
        const liveGameData = await Promise.all(
          favoriteGames.map(game => getLiveGame(game.gamePk))
        );
  
        setLiveGames(liveGameData);
      } catch (err) {
        console.error("Error en fetchLiveGames:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchLiveGames();
  }, [user]);
  

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text style={stylesFavorites.errorText}>{error}</Text>;
  if (liveGames.length === 0) return <Text style={stylesFavorites.noGamesText}>No hay juegos en vivo</Text>;

  return (
    <View style={stylesFavorites.container}>
      <Text style={stylesFavorites.title}>Juegos en Vivo</Text>
      <FlatList
        data={liveGames}
        keyExtractor={(item) => item.gamePk.toString()}
        renderItem={({ item }) => (
          <View style={stylesFavorites.gameItem}>
            <Text style={stylesFavorites.teamText}>{item.teams.away.team.name} vs {item.teams.home.team.name}</Text>
            <Text style={stylesFavorites.statusText}>{item.status.detailedState}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default FavoriteLiveGames;
