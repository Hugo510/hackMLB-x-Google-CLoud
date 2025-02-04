import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {StyleSheet, Text, TouchableOpacity} from 'react-native'
import { TabNavigator } from '../module/Tab/Components/navigation'

// Import all the screen we use in the Tab Navigation
 import LiveGames from '../module/Tab/screensTab/liveGames'
 import Favorites from '../module/favorites/favorites'
 import Games from '../module/teams/games'
 import Home from '../module/Home/home'
 import Notifications from '../module/notificationScreen/notificationScreen'
 import Profile from '../module/profile/profile'

 import TopBar from '../module/topBar/TopBar'

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
            title: 'Live',
            screen: 'LiveGames',
            icon: 'record-circle-outline',
            Component: LiveGames,
        },
        {
            id: 3,
            title: 'Home',
            screen: 'Home',
            icon: 'home-outline',
            Component: Home,
        },
        {
            id: 4,
            title: 'Favorites',
            screen: 'Favorites',
            icon: 'star-check',
            Component: Favorites,
        },
        {
            id: 5,
            title: 'Notification',
            screen: 'Notification',
            icon: 'bell-badge-outline',
            Component: Notifications,
        },
        {
            id: 6,
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
                    headerShown: true, header: () => (
                        <TopBar title="FMLB" showIcons={false} />),
                    tabBarStyle: styles.tabBar
                }}
            >
                {
                    tabs.map((item,) => 
                        <Tab.Screen
                            key={item.id}
                            name={item.screen}
                            component={item.Component}
                            options={{
                                tabBarShowLabel: false,
                                tabBarButton: (props) => <TabNavigator item={item} {...props} />,
                                    ...(item.screen === 'Profile' && {
                                        headerShown: true,
                                        header: () => (
                                                <TopBar title="FMLB" showIcons={true} />)
                                    }),
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