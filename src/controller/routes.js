// Import the dependences
import React, {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../Context/AuthContext';

// Importar the screens to show
import Login from '../module/Login/login'
import Register from '../module/Login/register'
import TabNav from './tabNavigation';
import NewsDetails from '../components/newDetails';
import GameDetails from '../module/gameDetails/gameDetails';
import SelectTeamsScreen from '../module/preferences/teamPreferences';
import TopBar from '../module/topBar/TopBar';
const Stack = createStackNavigator();

// Create the routes
function Router() {
  const { user } = useAuth(); 
  const [initialRoute, setInitialRoute] = useState(null); // Almacenar la ruta inicial

  useEffect(() => {
    if (user) {
      setInitialRoute('TabNavigator');
    } else {
      setInitialRoute('Login');
    }
  }, [user]);

  if (initialRoute === null) {
    return null;
  }

  return (
  
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="TabNavigator" component={TabNav} options={{ headerShown: false }} />
        <Stack.Screen name="NewsDetails" component={NewsDetails} options={{ header: () => <TopBar title="FMLB" showIcons={false} /> }} />
        <Stack.Screen name="GameDetails" component={GameDetails} options={{ header: () => <TopBar title="FMLB" showIcons={false} /> }} />
        <Stack.Screen name="SelectTeamsScreen" component={SelectTeamsScreen} options={{ header: () => <TopBar title="FMLB" showIcons={false} /> }} />
      </Stack.Navigator>
  );
}

// Export the components of routes to App.js
export default Router;