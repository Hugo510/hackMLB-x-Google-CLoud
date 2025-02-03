import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

axios.defaults.withCredentials = true;
// Cambiar la IP según la red local que utilices
const apiUrl = process.env.EXPO_PUBLIC_API_URL;
const PORT = process.env.EXPO_PUBLIC_PORT;

if (!apiUrl || !PORT) {
    console.error("Error: Las variables de entorno no están definidas correctamente");
  }
const apiClient = axios.create({
  baseURL: `http://${apiUrl}:${PORT}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
