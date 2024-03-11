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
//import LandingUI from './MobileApp/Screens/LandingUI';
import * as React from 'react';

import LandingUI from './MobileApp/Screens/LandingUI';

import ScannerPage from './MobileApp/Screens/ScannerPage';
import ProfilePage from './MobileApp/Screens/ProfilePage'
import NutritionalInfoPage from './MobileApp/Screens/NutritionInfoPage2';
import Login from './MobileApp/Screens/Login';
import History from './MobileApp/Screens/History';
import IndividualMeal from './MobileApp/Screens/IndividualMeal'


import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import { NavigationContainer } from '@react-navigation/native'; 

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      
      <Stack.Screen name='Landing' component={LandingUI} />
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Profile' component={ProfilePage} />
      <Stack.Screen name="ScannerPage" component={ScannerPage} />
      <Stack.Screen name='NutritionalInformationpage' component={NutritionalInfoPage} />
      <Stack.Screen name='IndividualMeal' component={IndividualMeal} />
      <Stack.Screen name='History' component={History}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
  
}
/*  */  