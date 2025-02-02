import React, { useEffect, useState } from 'react';
import { View, Text,TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import stylesFavorites from './styles/stylesFavorites';
import { useAuth } from "../../Context/AuthContext";
import { getPreferences, getTeams } from '../../services/config/auth';

  
function Favorites({ navigation }) {
  const { user } = useAuth();  
  const [teams, setTeams] = useState([]);  
  const [loading, setLoading] = useState(true); 
  const [favoriteTeams, setFavoriteTeams] = useState([]);  
  const [favoritePlayers, setFavoritePlayers] = useState([]);  

  // Cargar equipos al inicio
  useEffect(() => {
    const fetchTeams = async () => {
      await getTeams(setTeams, setLoading);
    };
    fetchTeams();
  }, []);

  // Obtener preferencias
  useEffect(() => {
    const fetchPreferences = async () => {
      if (user && user.id && teams.length > 0) {
        const preferences = await getPreferences(user.id);
        const selectedTeamNames = preferences.teams.map(teamId => {
          const team = teams.find(t => t.id === teamId);
          return team ? team.name : "Desconocido";  
        });
        setFavoriteTeams(selectedTeamNames);
        setFavoritePlayers(preferences.players || []); 
      }
    };
    fetchPreferences();
  }, [teams, user]); 

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }


  const handleTeams = async () => {
   navigation.navigate('SelectTeamsScreen')
  };
  
  const renderItem = ({ item }) => (
    <View style={stylesFavorites.itemContainer}>
      <Text style={stylesFavorites.itemText}>{item}</Text>
    </View>
  );

  return (
    <View style={stylesFavorites.container}>
      <Text style={stylesFavorites.title}>Mis Favoritos</Text>
      <TouchableOpacity  style={stylesFavorites.buttonSelecteam} onPress={handleTeams}>
            <Text style={stylesFavorites.buttonTextSelecteam}>SELECCIONAR EQUIPOS FAVORITOS</Text>
      </TouchableOpacity>
      <Text style={stylesFavorites.sectionTitle}>Equipos Favoritos</Text>
      <FlatList
        data={favoriteTeams}
        renderItem={renderItem}
        keyExtractor={(item, index) => `team-${index}`}
      />

      {/* <Text style={stylesFavorites.sectionTitle}>Jugadores Favoritos</Text>
      <FlatList
        data={favoritePlayers}
        renderItem={renderItem}
        keyExtractor={(item, index) => `player-${index}`}
      /> */}
    </View>
  );
  }
  
  export default Favorites; 