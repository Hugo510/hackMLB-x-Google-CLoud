import React from 'react';
import { View } from 'react-native';
import stylesProfile from './styles/stylesProfile';
import ProfileSession from './components/profileSession';
import WhitoutSession from '../../components/noProfile';
import { useAuth } from "../../Context/AuthContext";

  function Profile({navigation}) {
    const { token} = useAuth();
    
    const isLoggedIn = token != true
    return (
     
        <View style={stylesProfile.allPage}>

           {isLoggedIn ?(
          <>
            <ProfileSession navigation={navigation} />
          </>
        ) : (
          <WhitoutSession navigation={navigation}/>
      )}
        </View>
    );
  }
  
  export default Profile; 