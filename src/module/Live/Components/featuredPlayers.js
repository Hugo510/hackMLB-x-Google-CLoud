import React from 'react';
import { View, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import stylesFeaturedPlayers from '../Styles/stylesFeaturedPlayers';

const players = [
  {
    id: 1,
    position: 'P',
    name: 'Shohei Ohtani',
    imageUri: 'https://midfield.mlbstatic.com/v1/people/660271/spots/90?zoom=1.2',
    stats: '6.68 ERA 16.2 IP',
    circleText: 'R',
  },
  {
    id: 2,
    position: '1B',
    name: 'Aaron Judge',
    imageUri: 'https://midfield.mlbstatic.com/v1/people/592450/spots/90?zoom=1.2',
    stats: '4.21 ERA 10.0 IP',
    circleText: 'G',
  },
  {
    id: 3,
    position: 'OD',
    name: 'Mike Trout',
    imageUri: 'https://midfield.mlbstatic.com/v1/people/545361/spots/90?zoom=1.2',
    stats: '5.32 ERA 12.1 IP',
    circleText: 'B',
  }
];

const PlayerCard = ({ player }) => {
  return (
    <View style={stylesFeaturedPlayers.card}>
      <Text style={stylesFeaturedPlayers.position}>{player.position}</Text>
      <Image source={{ uri: player.imageUri }} style={stylesFeaturedPlayers.image} />
      <View style={stylesFeaturedPlayers.details}>
        <View style={stylesFeaturedPlayers.nameContainer}>
          <Text style={stylesFeaturedPlayers.name}>{player.name}</Text>
        </View>
        <View style={stylesFeaturedPlayers.statsContainer}>
          <View style={stylesFeaturedPlayers.circle}>
            <Text style={stylesFeaturedPlayers.circleText}>{player.circleText}</Text>
          </View>
          <Text style={stylesFeaturedPlayers.stats}>
            <Text style={stylesFeaturedPlayers.bold}>{player.stats.split(' ')[0]}</Text> {player.stats.split(' ')[1]} <Text style={stylesFeaturedPlayers.bold}>{player.stats.split(' ')[2]}</Text> {player.stats.split(' ')[3]}
          </Text>
        </View>
      </View>
    </View>
  );
};

const FeaturedPlayers = () => {
  return (
    <View style={stylesFeaturedPlayers.container}>
      {players.map(player => (
        <PlayerCard key={player.id} player={player} />
      ))}
    </View>
  );
};

export default FeaturedPlayers;
