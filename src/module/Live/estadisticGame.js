import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import EstadisticGameLive from './Components/estadisticGameLive';
import stylesLiveHeader from './Styles/stylesHeaderLive';


function EstadisticGame() {
    
  return (
    <View style={stylesLiveHeader.container}>
        <EstadisticGameLive />
    </View>
  );
}

export default EstadisticGame;