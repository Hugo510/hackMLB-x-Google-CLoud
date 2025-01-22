import React, { useState, useEffect } from "react";
import { View, Text, ImageBackground, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import stylesLogin from "./Styles/stylesLogin";

const images = [
  {
    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdBc_Vp-TF-YH3JQXeqzTTEauGNW8poVcuJQ&s",
  },
  {
    uri: "https://p.potaufeu.asahi.com/a11c-p/picture/28302561/0788faa5a6020ee34fa681cd6b152420.jpg",
  },
  {
    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE-swSb5-jbNonj9G8Ec5nzVtZ9ZWga9Dyvg&s",
  },
  {
    uri: "https://phantom-marca-us.unidadeditorial.es/985c307ae193d6ddd74102176984bab1/resize/828/f/jpg/assets/multimedia/imagenes/2024/02/04/17070692995957.jpg",
  },
];

function Login() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigation = useNavigation();

  const routeHome = () => {
    navigation.navigate("TabNavigator"); // go to the app
  };

  // Cambiar imagen automáticamente
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={stylesLogin.container}>
      {/* Imagen de fondo */}
      <ImageBackground
        source={{ uri: images[currentImageIndex].uri }}
        style={stylesLogin.backgroundImage}
        resizeMode="cover"
      >
        {/* Overlay azul */}
        <View style={stylesLogin.overlay}>
          {/* Logo Aun no funciona */}
          {/* <Image
            source={{
              uri:'',
            }}
            style={stylesLogin.logo}
          /> */}
          {/* Tarjeta de inicio de sesión */}
          <View style={stylesLogin.card}>
            <Text style={stylesLogin.title}>LOGIN</Text>
            <TouchableOpacity style={stylesLogin.button} onPress={routeHome}>
              <Text style={stylesLogin.buttonText}>Entrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

export default Login;
