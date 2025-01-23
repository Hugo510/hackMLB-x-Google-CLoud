import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Image, ScrollView } from 'react-native';
import stylesNoProfile from './Styles/stylesNoProfile';

function WhitoutSession({navigation}){
      
    const nouser = {
       image:'https://previews.123rf.com/images/chudtsankov/chudtsankov1405/chudtsankov140500045/28012657-bola-del-b%C3%A9isbol-feliz-con-el-casquillo-de-un-bate-de-b%C3%A9isbol-ilustraci%C3%B3n-aislado-en-blanco.jpg'
      };

    return(
        <>
        <ImageBackground
            source={{ uri: nouser.image }}
            style={stylesNoProfile.Image}
            resizeMode='cover'> </ImageBackground>    
         
         <Text style={stylesNoProfile.Text}>Aún No Has Iniciado Sesion</Text>

          <TouchableOpacity style={stylesNoProfile.LoginButton} onPress={() => navigation.navigate('Login')}>
            <Text style={stylesNoProfile.LoginText}>Iniciar Sesión</Text>
          </TouchableOpacity>
        </>
    );
};

export default WhitoutSession;