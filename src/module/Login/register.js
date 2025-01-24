import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import stylesLogin from "./Styles/stylesLogin";
import RegistrationForm from "./Components/form";
import { useNavigation } from "@react-navigation/native";

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

function Register() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigation = useNavigation();

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
          {/* Tarjeta de inicio de sesión */}
          <View style={stylesLogin.card}>
            <Image
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi5AKF6eAu9Va9BzZzgw0PSsQXw8rXPiQLHA&s",
              }}
              style={stylesLogin.logo}
            />
            <View style={stylesLogin.line} />
            <Text style={stylesLogin.title}>Register</Text>
            <RegistrationForm screenSelect="Register" />
            <View style={stylesLogin.line} />
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={stylesLogin.buttonRegister}>
                Don't have an account? Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

export default Register;
