import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
   
  });
  
  function Profile() {
      
    return (
      <ScrollView style={styles.container}>
  
        {/* Alerts Screen*/}
        <View style={{ flex: 10, justifyContent: 'center', alignItems: 'center',backgroundColor: '#991',}}>
          <Text style={{ fontSize: 100, color: '#fff',}}>PAGINA 7 Profile </Text>
        </View>
  
       
      </ScrollView>
    );
  }
  
  export default Profile; 