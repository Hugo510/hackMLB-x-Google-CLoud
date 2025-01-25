import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import stylesForm from "./Styles/stylesForm";
import { useNavigation } from "@react-navigation/native";

const RegistrationForm = ({ screenSelect }) => {
  const [screen] = useState(screenSelect);
  const navigation = useNavigation();

  // Estados para almacenar los valores del formulario
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    age: "",
    phone: "",
  });

  //Inputs del formulario
  const inputFields = [
    { name: "email", placeholder: "Email", keyboardType: "email-address" },
    { name: "password", placeholder: "Password", secureTextEntry: true },
    { name: "fullName", placeholder: "Full Name" },
    { name: "age", placeholder: "Age" },
    { name: "phone", placeholder: "Phone" },
  ];

  // Datos temporales de inicio de sesion
  const data = {
    email: "root@gmail.com",
    password: "1234",
  };

  // Función para manejar cambios en los inputs
  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    const email = formData.email.trim().toLowerCase();
    const password = formData.password.trim();
    const fullName = formData.fullName.trim();
    const phone = formData.phone.trim();
    const age = formData.age.trim();
  
    // Validar campos para Login
    if (screen === "Login") {
      if (!email || !password) {
        console.log("Campos vacíos, llénalos login");
        console.log(screen);
        return;
      }
  
      if (email === data.email && password === data.password) {
        console.log("Éxito", "Inicio de sesión correcto");
        navigation.navigate("TabNavigator");
      } else {
        console.log("Error", "Credenciales incorrectas");
      }
      return; 
    }
  
    // Validar campos para Register
    if (screen === "Register") {
      if (!email || !password || !fullName || !phone || !age) {
        console.log("Campos vacíos, llénalos register");
        console.log(screen);
        return;
      }
  
      const parsedAge = parseInt(age, 10);
      if (isNaN(parsedAge) || parsedAge <= 17) {
        console.log("Por favor, ingresa una edad válida");
        return;
      }
  
      const phoneValidation = /^[0-9]{10}$/; 
      if (!phoneValidation.test(phone)) {
        console.log(
          "Por favor, ingresa un número de teléfono válido (10 dígitos)"
        );
        return;
      }
  
      console.log("Registro exitoso", {
        email,
        password,
        fullName,
        phone,
        age,
      });
      navigation.navigate("TabNavigator");
    }
  };
  
  return (
    <View style={stylesForm.container}>
      {inputFields.map(
        (field) =>
          (screenSelect === "Register" ||
            (field.name !== "fullName" &&
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
