// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/

import 'react-native-gesture-handler';

import * as React from 'react';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// import HomeScreen from './pages/HomeScreen';
// import DetailsScreen from './pages/DetailsScreen';
// import ProfileScreen from './pages/ProfileScreen';
// import SettingsScreen from './pages/SettingsScreen';

const Tab = createBottomTabNavigator();

function HomeStack() {
    return (
        <Text>qr</Text>
    );
}

function SettingsStack() {
    return (
        <Text>SettingsStack</Text>
    );
}

function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="Feed"
                tabBarOptions={{
                    activeTintColor: '#42f44b',
                }}>
                <Tab.Screen
                    name="HomeStack"
                    component={HomeStack}
                    options={{
                        tabBarLabel: 'Home',
                        // tabBarIcon: ({ color, size }) => (
                        //     <MaterialCommunityIcons name="home" color={color} size={size} />
                        // ),
                    }}
                />
                <Tab.Screen
                    name="SettingsStack"
                    component={SettingsStack}
                    options={{
                        tabBarLabel: 'Settings',
                        // tabBarIcon: ({ color, size }) => (
                        //     <MaterialCommunityIcons
                        //         name="settings"
                        //         color={color}
                        //         size={size}
                        //     />
                        // ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default App;
