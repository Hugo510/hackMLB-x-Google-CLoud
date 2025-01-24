import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Image, ScrollView } from 'react-native';
import stylesProfile from './styles/stylesProfile';
import ProfileSession from './components/profileSession';
import WhitoutSession from '../../components/noProfile';

  function Profile({navigation}) {

    const user = {
      name: 'Miguel soto',
      email: 'Miguel@example.com',
      location: 'Durango, Mx',
      profileImage: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Dodgers_at_Nationals_%2853677192000%29_%28cropped%29.jpg',
      session: 'true',
      banner: 'https://img.mlbstatic.com/mlb-images/image/private/t_16x9/t_w1024/mlb/imlzxnamjqq98s8cxdfo'
    };
    
    return (
     
        <View style={stylesProfile.allPage}>

           {user.session === 'true' ? (
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