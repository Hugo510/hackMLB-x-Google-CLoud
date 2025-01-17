import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
 
});

function Login() {
    
  return (
    <ScrollView style={styles.container}>

      {/* FIRST SCREEN*/}
      <View style={{ flex: 10, justifyContent: 'center', alignItems: 'center',backgroundColor: '#afaf',}}>
        <Text style={{ fontSize: 100, color: '#333',}}>Hello Worrld!</Text>
      </View>

     
    </ScrollView>
  );
}

export default Login;