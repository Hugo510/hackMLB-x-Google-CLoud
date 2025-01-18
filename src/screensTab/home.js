import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
   
  });
  
  function Home() {
      
    return (
      <ScrollView style={styles.container}>
  
        {/* Alerts Screen*/}
        <View style={{ flex: 10, justifyContent: 'center', alignItems: 'center',backgroundColor: '#9998',}}>
          <Text style={{ fontSize: 100, color: '#fff',}}>PAGINA 4 HOME</Text>
        </View>
  
       
      </ScrollView>
    );
  }
  
  export default Home; 