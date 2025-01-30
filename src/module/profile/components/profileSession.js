import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Image, ScrollView } from 'react-native';
import stylesProfile from '../styles/stylesProfile';


function ProfileSession({navigation}){

    const user = {
        name: 'Miguel Soto',
        email: 'Miguel@example.com',
        location: 'Durango, Mx',
        profileImage: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Dodgers_at_Nationals_%2853677192000%29_%28cropped%29.jpg',
        session: 'true',
        banner: 'https://img.mlbstatic.com/mlb-images/image/private/t_16x9/t_w1024/mlb/imlzxnamjqq98s8cxdfo'
      };
      
    return(
        <>
        <View style={stylesProfile.container}>

        <ImageBackground
            source={{ uri: user.banner }}
            style={stylesProfile.banner}
            resizeMode='cover'>
        </ImageBackground>

          <Image source={{ uri: user.profileImage }} style={stylesProfile.profileImage}/>
          
          <Text style={stylesProfile.name}>{user.name}</Text>
          <Text style={stylesProfile.email}>{user.email}</Text>
          <Text style={stylesProfile.location}>{user.location}</Text>
    
         
    
          <TouchableOpacity style={stylesProfile.logoutButton} onPress={() => navigation.navigate('Login')}>
            <Text style={stylesProfile.logoutText}>Cerrar Sesión</Text>
          </TouchableOpacity>
         </View>
        </>
    );
};

export default ProfileSession;