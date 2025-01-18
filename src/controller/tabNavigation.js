import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {StyleSheet, Text} from 'react-native'
import { TabNavigator } from '../components/navigation'

// Import all the screen we use in the Tab Navigation
 import Login from '../screens/login'
 import LiveGames from '../screensTab/liveGames'
 import Favorites from '../screensTab/favorites'
 import Games from '../screensTab/games'
 import Home from '../screensTab/home'
 import Notification from '../screensTab/notification'
 import Players from '../screensTab/players'
 import Profile from '../screensTab/profile'



const Tab = createBottomTabNavigator()

const TabNav = () => {
    const tabs = [
        {
            id: 1,
            title: 'Games',
            screen: 'Games',
            icon: 'baseball-bat',
            Component: Games,
        },
        {
            id: 2,
            title: 'Players',
            screen: 'Players',
            icon: 'account-group',
            Component: Players,
        },
        {
            id: 3,
            title: 'Live',
            screen: 'LiveGames',
            icon: 'record-circle-outline',
            Component: LiveGames,
        },
        {
            id: 4,
            title: 'Home',
            screen: 'Home',
            icon: 'home-outline',
            Component: Home,
        },
        {
            id: 5,
            title: 'Favorites',
            screen: 'Favorites',
            icon: 'star-check',
            Component: Favorites,
        },
        {
            id: 6,
            title: 'Notification',
            screen: 'Notification',
            icon: 'bell-badge-outline',
            Component: Notification,
        },
        {
            id: 7,
            title: 'Profile',
            screen: 'Profile',
            icon: 'account-circle-outline',
            Component: Profile,
        },
        
    ]
    

    return(
        
            <Tab.Navigator
                initialRouteName={'Home'}
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: styles.tabBar
                }}
            >
                {
                    tabs.map((item, index) => 
                        <Tab.Screen
                            key={item.id}
                            name={item.screen}
                            component={item.Component}
                            options={{
                                tabBarShowLabel: false,
                                tabBarButton: (props) => <TabNavigator item={item} {...props} />
                            }}
                        />
                    )
                }
            </Tab.Navigator>
    
    )
}

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: '#003087',
        height: 100,
        position: 'absolute',
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default TabNav;