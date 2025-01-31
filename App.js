import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { AuthProvider } from './src/Context/AuthContext';
// Import the file with the routes to the app
import Router from './src/controller/routes';

const App = () => {
  return (
    // import the component to return with the app
    <AuthProvider>
      <Router/>
    </AuthProvider>
  );
};

export default App;
