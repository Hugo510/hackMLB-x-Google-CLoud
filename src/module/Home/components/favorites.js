import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import stylesFavorites from '../Styles/stylesFavorites';
import { useAuth } from '../../../Context/AuthContext';

const FavoriteGames = ({ navigation }) => {
  const [liveGames, setLiveGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const simulateLiveGames = () => {
      setLoading(true);
      setTimeout(() => {
        const mockLiveGames = [
          {
            gamePk: 123456,
            homeTeam: 'Yankees',
            awayTeam: 'Red Sox',
            homeScore: 5,
            awayScore: 3,
            time: '10:21',
            status: 'Live',
            homeImage: 'https://1000marcas.net/wp-content/uploads/2022/05/Font-New-York-Yankees-Logo.jpg',
            awayImage: 'https://i.pinimg.com/736x/54/57/35/545735fa6d810f255224ff013df9fe62.jpg',
          },
          {
            gamePk: 789012,
            homeTeam: 'Dodgers',
            awayTeam: 'Giants',
            homeScore: 2,
            awayScore: 4,
            time: '11:05',
            status: 'Top of the 5th',
            homeImage: 'https://upload.wikimedia.org/wikipedia/en/0/08/Los_Angeles_Dodgers_Logo.svg',
            awayImage: 'https://upload.wikimedia.org/wikipedia/en/5/58/San_Francisco_Giants_Logo.svg',
          }
        ];
        setLiveGames(mockLiveGames);
        setLoading(false);
      }, 200);
    };

    simulateLiveGames();
  }, []);

  if (loading) return <ActivityIndicator style={stylesFavorites.loading} size="large" color="#007AFF" />;
  if (liveGames.length === 0) return <Text style={stylesFavorites.noFavorites}>No hay juegos en vivo</Text>;

  return (
    <View>
      {liveGames.map((game) => (
        <TouchableOpacity key={game.gamePk} style={stylesFavorites.gameCard} onPress={() => navigation.navigate('GameDetails', { game })}>
          <View style={stylesFavorites.gameCard}>
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
      ))}
    </View>
  );
};

export default FavoriteGames;
