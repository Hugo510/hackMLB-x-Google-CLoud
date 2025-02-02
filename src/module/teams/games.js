import React, { useEffect, useState, useRef } from 'react';
import { View, Text, FlatList, ActivityIndicator, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { getSchedule } from '../../services/config/auth';
import stylesGames from './styles/stylesTableTeams';
import moment from 'moment'; // Importa moment para formatear fechas

function PlayerStats({ playerId }) {
  const [games, setGames] = useState([]);
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(moment());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [allGamesData, setAllGamesData] = useState(null); // Nuevo state para guardar todos los datos
  const scrollViewRef = useRef(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        const gamesData = await getSchedule();

        if (!gamesData || !gamesData.dates) {
          throw new Error("Invalid data structure from API");
        }

        setAllGamesData(gamesData); // Guarda todos los datos en el state

        const uniqueDates = [...new Set(gamesData.dates.map(date => date.date))].sort();
        setDates(uniqueDates);
        setGames([]); // Inicializa games como un array vacío

      } catch (err) {
        setError(`Error fetching games: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);


  useEffect(() => {
    if (dates.length > 0) {
      filterGamesByDate(selectedDate.format('YYYY-MM-DD'));
    }
  }, [selectedDate]);

  const filterGamesByDate = (date) => {
    if (!date || !allGamesData) return; // Salir si la fecha o los datos no son válidos

    const selectedGames = [];

    const selectedDateData = allGamesData.dates.find(d => d.date === date); // Usamos allGamesData aquí
    if (selectedDateData) {
      const gamesForDate = selectedDateData.games || [];
      selectedGames.push(...gamesForDate);
    }

    setGames(selectedGames);
  };

  const handleDatePress = (date) => {
    setSelectedDate(moment(date));
    filterGamesByDate(date);
  
    // Scroll al tab seleccionado
    const index = dates.indexOf(date);
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: index * 165,
        y: 0,
        animated: true,
      });
    }
  };

  const filterGames = (text) => {
    setSearchText(text);
    const filtered = games.filter(game =>
      game.teams.away.team.name.toLowerCase().includes(text.toLowerCase()) ||
      game.teams.home.team.name.toLowerCase().includes(text.toLowerCase())
    );
    setGames(filtered);
  };

  if (loading) {
    return (
      <View style={stylesGames.loadingContainer}> {/* Envuelve en un View */}
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  
  if (error) {
    return <Text style={stylesGames.errorText}>{error}</Text>; 
  }

  return (
    <View style={stylesGames.container}>
      <Text style={stylesGames.title}>MLB Season Games</Text>

      {/* Barra de búsqueda
      <TextInput
        style={stylesGames.searchInput}
        placeholder="Buscar por equipo"
        value={searchText}
        onChangeText={filterGames}
      /> */}

      {/* Navegación por fechas */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={stylesGames.dateTabsContainer}
        ref={scrollViewRef} 
      >
        {dates.map(date => (
          <TouchableOpacity
            key={date}
            style={[stylesGames.dateTab, selectedDate.format('YYYY-MM-DD') === date && stylesGames.activeDateTab]}
            onPress={() => handleDatePress(date)}
          >
            <Text style={[stylesGames.dateTabText, selectedDate.format('YYYY-MM-DD') === date && stylesGames.activeDateTabText]}>
              {moment(date).format('MMM DD')} {/* Este texto ahora está envuelto en <Text> */}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={games}
        keyExtractor={(item) => item.gamePk.toString()}
        renderItem={({ item }) => (
          <View style={stylesGames.gameItem}>
            <Text style={stylesGames.teamText}>{item.teams.away.team.name} vs {item.teams.home.team.name}</Text>
            <Text style={stylesGames.venueText}>{item.venue.name}</Text>
            <Text style={stylesGames.dateText}>{moment(item.gameDate).format('LLL')}</Text> {/* Formato de fecha con hora */}
          </View>
        )}
      />
    </View>
  );
}

export default PlayerStats;
