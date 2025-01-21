// Import the dependences
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importar the screens to show
import Login from '../module/Login/login'
import TabNav from './tabNavigation';
import NewsDetails from '../components/newDetails';

import TopBar from '../components/topBar';
const Stack = createStackNavigator();

// Create the routes
function Router() {
  return (
    <NavigationContainer>
        {/* define the initial route in the screen*/}
      <Stack.Navigator initialRouteName='Login'> 
          {/* Route for the login */}
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
          {/* Route for see the TabNavigator */}
          <Stack.Screen
            name="TabNavigator" component={TabNav} options={{ header: () => (
                <TopBar title="FMLB" showIcons={false} />),}} />
          {/*  route for see the information of the new Complete*/}
          <Stack.Screen name='NewsDetails' component={NewsDetails} options={{header: () => (
                <TopBar title="FMLB" showIcons={false} />),}} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Export the components of routes to App.js
export default Router;