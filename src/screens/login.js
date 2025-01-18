import React from 'react';
import { View, Text, StyleSheet, ScrollView,TouchableOpacity  } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
 
});

function Login() {

  const navigation = useNavigation();  

  const routeHome = () => {
    navigation.navigate('TabNavigator'); // go to the app
  };
  return (
    <ScrollView style={styles.container}>

      {/* FIRST SCREEN*/}
      <View style={{ flex: 10, justifyContent: 'center', alignItems: 'center',backgroundColor: '#afaf',}}>
        <Text style={{ fontSize: 100, color: '#333',}}>Hello Worrld!</Text>
      </View>

      {/* NO BORRES ESTE BOTON ADRIAN, HASTA QUE TERMINES EL LOGIN USAS ESTE */}
      <TouchableOpacity style={{alignItems:'center', marginTop: '150'}}  onPress={routeHome}>
          <Text style={{ color: '#fff', backgroundColor: '#003087', borderRadius: '100', width: '50', textAlign: 'center', alignContent: 'center' }} >IR AL INICIO</Text>
        </TouchableOpacity>
     
    </ScrollView>
  );
}

export default Login;