import React, { useMemo } from 'react';

import { View, StyleSheet } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import HomePage from '../Screens/HomePage';
import Community from '../Screens/Community';
import ScannerPage from '../Screens/ScannerPage';
import ProfilePage from '../Screens/ProfilePage';
import HistoryPage from '../Screens/HistoryPage';

const homeName = 'Home';
const scannerName = 'Scanner';
const profileName = 'Profile';
const historyName = 'History';

const Tab = createBottomTabNavigator();

/**
 * Component that defines the bottom tab navigation for the application.
 * It utilizes the React Navigation library to manage navigation between different screens.
 * Each tab is associated with a specific screen and displays an icon indicative of the screen's purpose.
 * 
 * @component
 * @example
 * // Typically used as part of your app's root component, wrapped inside a <NavigationContainer>
 * return (
 *   <NavigationContainer>
 *     <Tabs />
 *   </NavigationContainer>
 * );
 */
const Tabs = () => {
    return (
        <Tab.Navigator 
        screenOptions={{
            
            tabBarActiveTintColor: '#4CAF50',
            tabBarInactiveTintColor: 'grey',
        }}>
            <Tab.Screen 
            name='Home' 
            component={HomePage} 
            options={{
                tabBarIcon:({color,size})=>(
                    <MaterialIcons name="home" size={24} color={color} /> 
                )
            }}/>

            <Tab.Screen 
            name='Community' 
            component={Community} 
            options={{
                tabBarIcon:({color,size})=>(
                    <MaterialIcons name="people" size={24} color={color} />
                )
            }}/>

            <Tab.Screen 
            name=' '
            component={ScannerPage} 
            options={{
                tabBarIcon:({color,size})=>(
                    <View style={styles.scannerButton}>
                        <MaterialIcons name="center-focus-strong" size={40} color={color} />
                    </View>
                )
            }}/>
            
            <Tab.Screen 
            name='Profile' 
            component={ProfilePage} 
            options={{
                tabBarIcon:({color,size})=>(
                    <MaterialIcons name="person" size={24} color={color} />
                )
            }}/>
            <Tab.Screen 
            name='History' 
            component={HistoryPage} 
            options={{
                tabBarIcon:({color,size})=>(
                    <MaterialIcons name="manage-search" size={24} color={color} />
                )
            }}
            />

        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    buttons: {
        alignItems: 'center',
        justifyContent: 'center',
        top: 10
    },

    icons: {
        width: 10,
        height: 10,
    },

    scannerButton: {
        backgroundColor: '#ccc', 
        height: 75,
        width: 75, 
        borderRadius: 37.5, 
        alignItems: 'center',
        justifyContent: 'center',
        top: -10, 
        elevation: 4, 
    },
    
    words: {
        fontSize: 12,
    }
})

export default Tabs;
