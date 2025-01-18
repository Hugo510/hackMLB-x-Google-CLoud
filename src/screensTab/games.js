import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
   
  });
  
  function Games() {
      
    return (
      <ScrollView style={styles.container}>
  
        {/* Alerts Screen*/}
        <View style={{ flex: 10, justifyContent: 'center', alignItems: 'center',backgroundColor: '#178',}}>
          <Text style={{ fontSize: 100, color: '#333',}}>PAGINA 1 JUEGOS</Text>
        </View>
  
       
      </ScrollView>
    );
  }
  
  export default Games; 