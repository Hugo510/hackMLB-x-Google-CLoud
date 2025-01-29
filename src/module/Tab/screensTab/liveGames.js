import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import EstadisticGame from '../../Live/estadisticGame';
import stylesLiveHeader from '../../Live/Styles/stylesHeaderLive';


function LiveGames() {
    
  return (
    <View style={stylesLiveHeader.container}>
      <ScrollView style={stylesLive.list}>
        <EstadisticGame />
      </ScrollView>
    </View>
  );
}

export default LiveGames;