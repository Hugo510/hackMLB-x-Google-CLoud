import React, { useEffect, useState } from 'react';
import { View, Text,Image, ActivityIndicator, Touchable, TouchableOpacity } from 'react-native';
import stylesFavorites from '../Styles/stylesFavorites';

const FavoriteGames = ({navigation}) => {
  const [favoriteGames, setFavoriteGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const simulatedApiResponse = [
        {
          id: '1',
          homeTeam: 'Yankees',
          awayTeam: 'Red Sox',
          homeScore: 5,
          awayScore: 3,
          time: '10:21',
          status: 'Live',
          homeImage: 'https://1000marcas.net/wp-content/uploads/2022/05/Font-New-York-Yankees-Logo.jpg',
          awayImage: 'https://i.pinimg.com/736x/54/57/35/545735fa6d810f255224ff013df9fe62.jpg',
        },
        
      ];

      setFavoriteGames(simulatedApiResponse);
      setLoading(false);
    }, 100); 
  }, []);

  if (loading) {
    return <ActivityIndicator style={stylesFavorites.loading} size="large" color="#007AFF" />;
  }

  return (
    <View>
    {favoriteGames.length > 0 ? (

      favoriteGames.map((game) => (

        <TouchableOpacity key={game.id} style={stylesFavorites.gameCard} onPress={()=> navigation.navigate('GameDetails', {game})}>

        <View key={game.id} style={stylesFavorites.gameCard}>
          <Text style={stylesFavorites.status}>{game.status}</Text>
          <Text style={stylesFavorites.time}>{game.time}</Text>

          <View style={stylesFavorites.teams}>

            <View style={stylesFavorites.team}>
              <Image source={{ uri: game.homeImage }} style={stylesFavorites.teamImage} />
              <Text style={stylesFavorites.teamName}>{game.homeTeam}</Text>
            </View>
            <Text style={stylesFavorites.score}> {game.homeScore} </Text>
            <Text style={stylesFavorites.vs}>-</Text>
            <Text style={stylesFavorites.score}> {game.awayScore} </Text>

            <View style={stylesFavorites.team}>
              <Image source={{ uri: game.awayImage }} style={stylesFavorites.teamImage} />
              <Text style={stylesFavorites.teamName}>{game.awayTeam}</Text>
            </View>

          </View>
        </View>
        </TouchableOpacity>
      ))
    ) : (
        <Text style={stylesFavorites.noFavorites}>We can't find any games available</Text>
    )}
  </View>
  );
};



export default FavoriteGames;
