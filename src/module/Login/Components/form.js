import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import stylesForm from './Styles/stylesForm';

const RegistrationForm = () => {
  // Estados para almacenar los valores del formulario
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  // Función para manejar cambios en los inputs
  const handleChange = () => {
    console.log('Inputs validos');
  };

  // Función para manejar el envío del formulario
  const handleSubmit = () => {
    console.log("Datos enviados")
  };

  return (
    <View style={stylesForm.container}>

      {/* Campo Nombre */}
      <TextInput
        style={stylesForm.input}
        placeholder="Nombre"
        value={formData.name}
        onChangeText={(value) => handleChange('name', value)}
      />

      {/* Campo Email */}
      <TextInput
        style={stylesForm.input}
        placeholder="Correo electrónico"
        value={formData.email}
        onChangeText={(value) => handleChange('email', value)}
        keyboardType="email-address"
      />

      {/* Campo Contraseña */}
      <TextInput
        style={stylesForm.input}
        placeholder="Contraseña"
        value={formData.password}
        onChangeText={(value) => handleChange('password', value)}
        secureTextEntry
      />

      {/* Botón de Enviar */}
      {/* <TouchableOpacity style={stylesForm.button} onPress={handleSubmit}>
        <Text style={stylesForm.buttonText}>Registrar</Text>
      </TouchableOpacity> */}
    </View>
  );
};



export default RegistrationForm;
