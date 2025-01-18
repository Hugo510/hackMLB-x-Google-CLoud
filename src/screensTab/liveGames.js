import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
 
});

function LiveGames() {
    
  return (
    <ScrollView style={styles.container}>

      {/* FIRST SCREEN*/}
      <View style={{ flex: 10, justifyContent: 'center', alignItems: 'center',backgroundColor: '#123',}}>
        <Text style={{ fontSize: 100, color: '#333',}}>PAGINA 3 LiveGames</Text>
      </View>

     
    </ScrollView>
  );
}

export default LiveGames;