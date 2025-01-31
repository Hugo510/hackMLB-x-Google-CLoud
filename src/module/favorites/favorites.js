import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import WhitoutSession from '../../components/noProfile';
import stylesFavorites from './styles/stylesFavorites';
import { useAuth } from "../../Context/AuthContext";

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
   
  });
  
  function Favorites({navigation}) {
    const {token} = useAuth;

    const isLoggedIn = token !== true
    return (

    <View style={stylesFavorites.allPage}>
      {isLoggedIn ? (
      <>
        <ScrollView style={styles.container}>
  
        {/* Alerts Screen*/}
        <View style={{ flex: 10, justifyContent: 'center', alignItems: 'center',backgroundColor: '#828',}}>
          <Text style={{ fontSize: 100, color: '#333',}}>PAGINA 5 FAVORITOS</Text>
        </View>
  
       
        </ScrollView>
      </>
      ) : (
        <WhitoutSession navigation={navigation}/>
      )}
    </View>
    );
  }
  
  export default Favorites; 