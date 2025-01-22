import React, { useEffect, useState } from 'react';
import { View, Text,Image, ActivityIndicator } from 'react-native';
import stylesHeader from '../Styles/stylesHeaderLive';

const EstadisticGameLive = () => {
  const [favoriteGames, setFavoriteGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const simulatedApiResponse = [
        {
          id: '11',
          homeTeam: 'Yankees',
          awayTeam: 'Red Sox',
          homeScore: 4,
          awayScore: 2,
          time: '10:21',
          status: 'En Vivo',
          homeImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Los_Angeles_Angels_of_Anaheim.svg/188px-Los_Angeles_Angels_of_Anaheim.svg.png',
          awayImage: 'https://i.pinimg.com/736x/54/57/35/545735fa6d810f255224ff013df9fe62.jpg',
        },
        
      ];

      setFavoriteGames(simulatedApiResponse);
      setLoading(false);
    }, 100); 
  }, []);

  if (loading) {
    return <ActivityIndicator style={stylesHeader.loading} size="large" color="#007AFF" />;
  }

  return (
    <View>
    {favoriteGames.length > 0 ? (

      favoriteGames.map((game) => (

        <View key={game.id} style={stylesHeader.gameCard}>
          <Text style={stylesHeader.status}>{game.status}</Text>
          <Text style={stylesHeader.time}>{game.time}</Text>

          <View style={stylesHeader.teams}>

            <View style={stylesHeader.team}>
              <Image source={{ uri: game.homeImage }} style={stylesHeader.teamImage} />
              <Text style={stylesHeader.teamName}>{game.homeTeam}</Text>
            </View>
            <Text style={stylesHeader.score}> {game.homeScore} </Text>
            <Text style={stylesHeader.vs}>-</Text>
            <Text style={stylesHeader.score}> {game.awayScore} </Text>

            <View style={stylesHeader.team}>
              <Image source={{ uri: game.awayImage }} style={stylesHeader.teamImage} />
              <Text style={stylesHeader.teamName}>{game.awayTeam}</Text>
            </View>

          </View>

         
          {/* <Text style={stylesHeader.score}> {game.homeScore} - {game.awayScore} </Text> */}

        </View>
      ))
    ) : (
        <Text style={stylesHeader.noFavorites}>We can't find any games available</Text>
    )}
  </View>
  );
};



export default EstadisticGameLive;
