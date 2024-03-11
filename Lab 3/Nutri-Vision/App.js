import { StatusBar } from 'expo-status-bar';
import {  Platform, 
          StyleSheet, 
          Text, 
          View, 
          Image, 
          Button, 
          TouchableHighlight, 
          SafeAreaView, 
          Alert,
          Dimensions, } from 'react-native';
import LandingUI from './MobileApp/Screens/LandingUI';
import ProfilePage from './MobileApp/Screens/ProfilePage'
import Login from './MobileApp/Screens/Login';
import History from './MobileApp/Screens/History';
import IndiMeal from './MobileApp/Screens/IndiMeal'

import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import { NavigationContainer } from '@react-navigation/native'; 


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>

      <Stack.Screen
        name='IndiMeal'
        component={IndiMeal}
      />

      <Stack.Screen
        name='History'
        component={History}
      />
      
      <Stack.Screen
        name='Landing'
        component={LandingUI}
      />
      <Stack.Screen
        name='Login'
        component={Login}
      />
      <Stack.Screen
        name='Profile'
        component={ProfilePage}
      />
      
      </Stack.Navigator>
    </NavigationContainer>
  );
  
}
/*  */  