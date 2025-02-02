import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import stylesForm from "./Styles/stylesForm";
import { useNavigation } from "@react-navigation/native";
import { login, signup } from "../../../services/config/auth";
import { useAuth } from "../../../Context/AuthContext";


const RegistrationForm = ({ screenSelect }) => {
  const [screen] = useState(screenSelect);
  const navigation = useNavigation();

  // Estados para almacenar los valores del formulario
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    age: "",
    phone: "",
  });

  //Inputs del formulario
  const inputFields = [
    { name: "email", placeholder: "Email", keyboardType: "email-address" },
    { name: "password", placeholder: "Password", secureTextEntry: true },
    { name: "name", placeholder: "Full Name" },
    { name: "age", placeholder: "Age" },
    { name: "phone", placeholder: "Phone" },
  ];

  // Función para manejar cambios en los inputs
  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };
  const { loginUser } = useAuth();
  const handleSubmit = async () => {
    const email = formData.email.trim().toLowerCase();
    const password = formData.password.trim();
    const name = formData.name.trim();
    const phone = formData.phone.trim();
    const age = formData.age.trim();
  
    // Validar campos para Login
    if (screen === "Login") {
      if (!email || !password) {
        console.log("Campos vacíos, llénalos login");
        console.log(screen);
        return;
      }
      console.log('Iniciando Proceso para Login')
      const user = { email, password };

      try {
        // Llamar a la función login desde los servicios
        const data = await login(user);
        console.log('Login successful:', data);
        await loginUser(data); // Guarda en AsyncStorage y Context
        navigation.navigate("TabNavigator");
      } catch (error) {    
          console.error("Error message:", error.message);
        console.error("Config:", error.config);
      }
      return; // Prevenir la ejecución adicional del registro si es login
    }
  
    // Validar campos para Register
    if (screen === "Register") {
      if (!email || !password || !name || !phone || !age) {
        console.log("Campos vacíos, llénalos register");
        alert('Campos vacíos, llénalos')
        console.log(screen);
        return;
      }
  
      const parsedAge = parseInt(age, 10);
      if (isNaN(parsedAge) || parsedAge <= 17) {
        console.log("Por favor, ingresa una edad válida");
        alert('Por favor, ingresa una edad válida')
        return;
      }
  
      const phoneValidation = /^[0-9]{10}$/; 
      if (!phoneValidation.test(phone)) {
        console.log(
          "Por favor, ingresa un número de teléfono válido (10 dígitos)"
        );
        alert("Por favor, ingresa un número de teléfono válido (10 dígitos)");
        return;
      }
      // Llamar a signup para crear un usuario
    try {
      // Llamar a la función signup desde los servicios
      const response = await signup({ email, password, name, phone, age });
      console.log("Registro exitoso:", response);
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error al registrar usuario:", error.message);
      alert("Error al registrar usuario: "); // Mostrar mensaje de error al usuario
    }
  }

    
  };
  
  return (
    <View style={stylesForm.container}>
      {inputFields.map(
        (field) =>
          (screenSelect === "Register" ||
            (field.name !== "name" &&
              field.name !== "age" &&
              field.name !== "phone")) && (
            <TextInput
              key={field.name}
              style={stylesForm.input}
              placeholder={field.placeholder}
              value={formData[field.name]}
              onChangeText={(value) => handleChange(field.name, value)}
              keyboardType={field.keyboardType || "default"}
              secureTextEntry={field.secureTextEntry}
            />
          )
      )}

      {/* Botón de Enviar */}
      <TouchableOpacity style={stylesForm.button} onPress={handleSubmit}>
        <Text style={stylesForm.buttonText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegistrationForm;
