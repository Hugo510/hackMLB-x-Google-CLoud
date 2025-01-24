import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import stylesForm from "./Styles/stylesForm";
import { useNavigation } from "@react-navigation/native";

const RegistrationForm = () => {
  // Estados para almacenar los valores del formulario
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigation = useNavigation();

  // Datos temporales de inicio de sesion
  const data = {
    email: "root@gmail.com",
    password: "1234",
  };

  // Función para manejar cambios en los inputs
  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = () => {
    //sanitizacion yy estandarizacion de niputs
    const email = formData.email.trim().toLowerCase();
    const password = formData.password.trim();

    if (!email || !password) {
      console.log("Campos vacios, llenalos");
    } else if (email === data.email && password === data.password) {
      console.log("Éxito", "Inicio de sesión correcto");
      navigation.navigate("TabNavigator"); // go to the app
    } else {
      console.log("Error", "Credenciales incorrectas");
    }
  };

  return (
    <View style={stylesForm.container}>
      {/* Campo Email */}
      <TextInput
        style={stylesForm.input}
        placeholder="Email"
        value={formData.email}
        onChangeText={(value) => handleChange("email", value)}
        keyboardType="email-address"
      />

      {/* Campo Contraseña */}
      <TextInput
        style={stylesForm.input}
        placeholder="Password"
        value={formData.password}
        onChangeText={(value) => handleChange("password", value)}
        secureTextEntry
      />

      {/* Botón de Enviar */}
      <TouchableOpacity style={stylesForm.button} onPress={handleSubmit}>
        <Text style={stylesForm.buttonText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegistrationForm;
