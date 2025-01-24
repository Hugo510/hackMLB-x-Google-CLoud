// Import the dependences
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importar the screens to show
import Login from '../module/Login/login'
import Register from '../module/Login/register'
import TabNav from './tabNavigation';
import NewsDetails from '../components/newDetails';
import GameDetails from '../module/gameDetails/gameDetails';

import TopBar from '../module/topBar/TopBar';
const Stack = createStackNavigator();

// Create the routes
function Router() {
  return (
    <NavigationContainer>
        {/* define the initial route in the screen*/}
      <Stack.Navigator initialRouteName='Login'> 
          {/* Route for the login */}
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
          {/* Route for the register */}
          <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}/>
          {/* Route for see the TabNavigator */}
          <Stack.Screen
            name="TabNavigator" component={TabNav} options={{headerShown: false}} />
          {/*  route for see the information of the new Complete*/}
          <Stack.Screen name='NewsDetails' component={NewsDetails} options={{header: () => (
                <TopBar title="FMLB" showIcons={false} />),}} />
          {/* Route for see Detail frome a ine Game */}
          <Stack.Screen name='GameDetails' component={GameDetails} options={{header: () => (
                <TopBar title="FMLB" showIcons={false} />),}} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Export the components of routes to App.js
export default Router;