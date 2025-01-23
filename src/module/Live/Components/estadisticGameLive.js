import React, { useEffect, useState } from 'react';
import { View, Text,Image, ActivityIndicator } from 'react-native';
import stylesHeader from '../Styles/stylesHeaderLive';
import { style } from 'deprecated-react-native-prop-types/DeprecatedViewPropTypes';

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
          homeImage: 'https://s.yimg.com/cv/apiv2/default/mlb/20190319/500x500/yankees_wbgs.png',
          awayImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Washington_Nationals_logo.svg/2048px-Washington_Nationals_logo.svg.png',
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
              <Text style={stylesHeader.marcadorActualHomeTeam}>51-61</Text>
            </View>
            <Text style={stylesHeader.score}> {game.homeScore} </Text>
            <View style={stylesHeader.vsContainer}>
              <Text style={stylesHeader.vs}>VS</Text>
              <Text style={stylesHeader.marcador}>2-2, 2 Out</Text>
            </View>
            <Text style={stylesHeader.score}>{game.awayScore} </Text>
            <View style={stylesHeader.team}>
              <Image source={{ uri: game.awayImage }} style={stylesHeader.teamImage} />
              <Text style={stylesHeader.teamName}>{game.awayTeam}</Text>
              <Text style={stylesHeader.marcadorActualAwayTeam}>67-46</Text>
            </View>
          </View>

        </View>
      ))
    ) : (
        <Text style={stylesHeader.noFavorites}>We can't find any games available</Text>
    )}
  </View>
  );
};



export default EstadisticGameLive;
