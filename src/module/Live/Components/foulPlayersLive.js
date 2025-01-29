import React from 'react';
import { View, Text } from 'react-native';
import stylesFoulPlayersLive from '../Styles/stylesFoulPlayersLive';

const foulPlayersData = [
  { id: 1, count: '1', type: 'Foul', pitch: 'Sinker', score: '0-1' },
  { id: 2, count: '2', type: 'Foul', pitch: 'Curveball', score: '1-1' },
  { id: 3, count: '3', type: 'Foul', pitch: 'Fastball', score: '2-1' },
  { id: 4, count: '4', type: 'Foul', pitch: 'Slider', score: '3-1' },
];

const FoulPlayersLive = ({ player }) => {
  return (
    <View style={stylesFoulPlayersLive.container}>
      <View style={stylesFoulPlayersLive.left}>
        <Text style={stylesFoulPlayersLive.text}>{player.count}</Text>
        <View style={stylesFoulPlayersLive.dot} />
        <Text style={stylesFoulPlayersLive.text}>{player.type}</Text>
      </View>
      <View style={stylesFoulPlayersLive.center}>
        <Text style={stylesFoulPlayersLive.text}>{player.pitch}</Text>
      </View>
      <View style={stylesFoulPlayersLive.right}>
        <Text style={stylesFoulPlayersLive.text}>{player.score}</Text>
      </View>
    </View>
  );
};

const FoulPlayersLiveList = () => {
  return (
    <View>
      {foulPlayersData.map((player) => (
        <FoulPlayersLive key={player.id} player={player} />
      ))}
    </View>
  );
};

export default FoulPlayersLiveList;
