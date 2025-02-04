import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getPreferences } from "../services/config/auth";
import { useNavigation, CommonActions } from "@react-navigation/native";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); 
  const navigation= useNavigation();
  
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("userToken");
        const storedUser = await AsyncStorage.getItem("userData");

        if (storedToken && storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setToken(storedToken);
          setUser(parsedUser);

          // 🔹 Obtener preferencias y redirigir si no existen
          try {
            const preferences = await getPreferences(parsedUser.id);
            if (!preferences || preferences.teams.length === 0) {
              console.log("No hay preferencias, redirigiendo a selección de equipo...");
              navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [{ name: 'SelectTeamsScreen' }]
                        }));
            }
          } catch (error) {
            if (error.response?.status === 404) {
              console.log("Preferencias no encontradas (404), redirigiendo...");
              navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'SelectTeamsScreen' }]
                }));
            } else {
              console.error("Error al obtener preferencias:", error);
            }
          }
        }
      } catch (error) {
        console.error("Error cargando datos del usuario:", error);
      }
      setLoading(false);
    };

    loadUserData();
  }, []);


  const loginUser = async (data) => {
    if (!data || !data.token) {
      console.error("Error: No se puede guardar un token vacío");
      return;
    }
    const expirationDate = new Date().getTime() + 24 * 60 * 60 * 1000; //Duracion de 24 horas
    await AsyncStorage.setItem("userToken", data.token);
    await AsyncStorage.setItem("userData", JSON.stringify(data.user));
    await AsyncStorage.setItem("expirationDate", expirationDate.toString());
    setToken(data.token);
    setUser(data.user);

 // 🔹 Verificar preferencias después del login
    try {
      const preferences = await getPreferences(data.user.id);
      if (!preferences || preferences.teams.length === 0) {
        console.log("No hay preferencias, redirigiendo...");
        navigation.dispatch(
          CommonActions.reset({
              index: 0,
              routes: [{ name: 'SelectTeamsScreen' }]
          }));
      }
    } catch (error) {
      if (error.response?.status === 404) {
        console.log("Preferencias no encontradas (404), redirigiendo...");
        navigation.dispatch(
          CommonActions.reset({
              index: 0,
              routes: [{ name: 'SelectTeamsScreen' }]
          }));
      } else {
        console.error("Error al obtener preferencias:", error);
      }
    }
    };
  const logoutUser = async () => {
    await AsyncStorage.removeItem("userToken");
    await AsyncStorage.removeItem("userData");

    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, setUser, setToken, setLoading, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
