import React, {useEffect} from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Image, ScrollView } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import stylesProfile from '../styles/stylesProfile';
import { useAuth } from '../../../Context/AuthContext';

function ProfileSession({navigation}){
    const { user, logoutUser,token } = useAuth();

    const userProvide = {
        profileImage: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Dodgers_at_Nationals_%2853677192000%29_%28cropped%29.jpg',
        banner: 'https://img.mlbstatic.com/mlb-images/image/private/t_16x9/t_w1024/mlb/imlzxnamjqq98s8cxdfo'
      };
    const handleLogout = async () => {
        await logoutUser(); 
    };

    useEffect(() => {
      if (!user) {
          navigation.dispatch(
              CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'Login' }],
              })
          );
      }
  }, [user, navigation]); 

    return(
        <>
        <View style={stylesProfile.container}>

        <ImageBackground
            source={{ uri: userProvide.banner }}
            style={stylesProfile.banner}
            resizeMode='cover'>
        </ImageBackground>

          <Image source={{ uri: userProvide.profileImage }} style={stylesProfile.profileImage}/>
        {user ? (
          <>
          <Text style={stylesProfile.name}>{user.name}</Text>
          <Text style={stylesProfile.email}>{user.email}</Text>
          <Text style={stylesProfile.location}>{user.location}</Text>
          </>
        ) : null} 
          <TouchableOpacity style={stylesProfile.logoutButton} onPress={handleLogout}>
            <Text style={stylesProfile.logoutText}>Cerrar Sesión</Text>
          </TouchableOpacity>
         </View>
        </>
    );
};

export default ProfileSession;