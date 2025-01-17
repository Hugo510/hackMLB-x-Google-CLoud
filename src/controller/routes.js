// Import the dependences
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importar the screens to show
import Login from '../screens/login';

const Stack = createStackNavigator();

// Create the routes
function Router() {
  return (
    <NavigationContainer>
        {/* define the initial route in the screen*/}
      <Stack.Navigator initialRouteName='Login'> 
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Export the components of routes to App.js
export default Router;