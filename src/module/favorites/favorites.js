import React, { useEffect, useState } from 'react';
import { View, Text,TouchableOpacity, ScrollView, FlatList } from 'react-native';
import WhitoutSession from '../../components/noProfile';
import stylesFavorites from './styles/stylesFavorites';
import { useAuth } from "../../Context/AuthContext";
import { Touchable } from 'react-native';

  
function Favorites({ navigation }) {
  const favoriteTeams = ['Los Angeles Dodgers', 'New York Yankees', 'Boston Red Sox'];
  const favoritePlayers = ['Shohei Ohtani', 'Aaron Judge', 'Mookie Betts'];

  const handleTeams = async () => {
   navigation.navigate('SelectTeamsScreen')
};
  const renderItem = ({ item }) => (
    <View style={stylesFavorites.itemContainer}>
      <Text style={stylesFavorites.itemText}>{item}</Text>
    </View>
  );

  return (
    <ScrollView style={stylesFavorites.container}>
      <Text style={stylesFavorites.title}>Mis Favoritos</Text>
      <TouchableOpacity  onPress={handleTeams}>
            <Text>SELECCIONAR EQUIPOS FAVORITOS</Text>
          </TouchableOpacity>
      <Text style={stylesFavorites.sectionTitle}>Equipos Favoritos</Text>
      <FlatList
        data={favoriteTeams}
        renderItem={renderItem}
        keyExtractor={(item, index) => `team-${index}`}
      />

      <Text style={stylesFavorites.sectionTitle}>Jugadores Favoritos</Text>
      <FlatList
        data={favoritePlayers}
        renderItem={renderItem}
        keyExtractor={(item, index) => `player-${index}`}
      />
    </ScrollView>
  );
  }
  
  export default Favorites; 