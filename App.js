import React, { useEffect, useState } from 'react';
import { AuthProvider, useAuth } from './src/Context/AuthContext';
import Router from './src/controller/routes';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const { user, setUser, setToken, } = useAuth(); 
  const [isReady, setIsReady] = useState(false); 

  useEffect(() => {
    const checkSession = async () => {
      const token = await AsyncStorage.getItem("userToken");
      const expirationDate = await AsyncStorage.getItem("expirationDate");

      if (!token || !expirationDate) {
        setIsReady(true);
        return;
      }

      const currentTime = new Date().getTime();
      if (currentTime > parseInt(expirationDate)) {
        await AsyncStorage.removeItem("userToken");
        await AsyncStorage.removeItem("userData");
        await AsyncStorage.removeItem("expirationDate");
        setUser(null);
        setToken(null);
        setIsReady(true);
        return;
      }

      const userData = await AsyncStorage.getItem("userData");
      if (userData) {
        setUser(JSON.parse(userData));
        setToken(token);
      }
      setIsReady(true); 
    };

    checkSession();
  }, []);

  if (!isReady) {
    return null;
  }

  return (
      <Router isAuthenticated={!!user}/> 
  );
};
const AppWrapper = () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};

export default AppWrapper;
