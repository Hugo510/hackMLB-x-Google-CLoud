import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("userToken");
        const storedUser = await AsyncStorage.getItem("userData");

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Error loading user data", error);
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
