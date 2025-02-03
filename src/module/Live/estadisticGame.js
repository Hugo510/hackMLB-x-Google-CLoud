import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import EstadisticGameLive from './Components/estadisticGameLive';
import stylesLiveHeader from './Styles/stylesHeaderLive';
import FeaturedPlayers from './Components/featuredPlayers';
import FoulPlayersLive from './Components/foulPlayersLive';
import InfoGameLive from './Components/infoGamelive';
import LiveAllGames from './Components/allLiveGames';
function EstadisticGame() {
    
  return (
    <View style={stylesLiveHeader.container}>
        <LiveAllGames />
        {/* <EstadisticGameLive />
        <FeaturedPlayers />
        <FoulPlayersLive />
        <InfoGameLive /> */}
    </View>
  );
}

export default EstadisticGame;