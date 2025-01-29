import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import EstadisticGameLive from './Components/estadisticGameLive';
import stylesLiveHeader from './Styles/stylesHeaderLive';
import FeaturedPlayers from './Components/featuredPlayers';

function EstadisticGame() {
    
  return (
    <View style={stylesLiveHeader.container}>
        <EstadisticGameLive />
        <FeaturedPlayers />
    </View>
  );
}

export default EstadisticGame;